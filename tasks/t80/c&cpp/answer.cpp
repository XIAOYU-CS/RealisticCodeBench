#include <cctype>
#include <map>
#include <stdexcept>
#include <string>
#include <vector>

namespace {
struct Field {
    std::string key;
    std::string value;
};

void skip_ws(const std::string &text, size_t &pos) {
    while (pos < text.size() && std::isspace(static_cast<unsigned char>(text[pos]))) {
        ++pos;
    }
}

void expect(const std::string &text, size_t &pos, char ch) {
    skip_ws(text, pos);
    if (pos >= text.size() || text[pos] != ch) {
        throw std::invalid_argument("invalid JSON object");
    }
    ++pos;
}

std::string parse_string(const std::string &text, size_t &pos) {
    expect(text, pos, '"');
    std::string out;
    while (pos < text.size()) {
        char ch = text[pos++];
        if (ch == '"') {
            return out;
        }
        if (ch == '\\') {
            if (pos >= text.size()) {
                throw std::invalid_argument("invalid JSON escape");
            }
            out += text[pos++];
        } else {
            out += ch;
        }
    }
    throw std::invalid_argument("unterminated JSON string");
}

std::string parse_value(const std::string &text, size_t &pos) {
    skip_ws(text, pos);
    size_t start = pos;
    if (pos >= text.size()) {
        throw std::invalid_argument("missing JSON value");
    }
    if (text[pos] == '"') {
        parse_string(text, pos);
        return text.substr(start, pos - start);
    }
    if (text[pos] == '{') {
        int depth = 0;
        do {
            if (pos >= text.size()) {
                throw std::invalid_argument("unterminated JSON object");
            }
            if (text[pos] == '"') {
                parse_string(text, pos);
                continue;
            }
            if (text[pos] == '{') {
                ++depth;
            } else if (text[pos] == '}') {
                --depth;
            }
            ++pos;
        } while (depth > 0);
        return text.substr(start, pos - start);
    }
    while (pos < text.size() && text[pos] != ',' && text[pos] != '}') {
        ++pos;
    }
    size_t end = pos;
    while (end > start && std::isspace(static_cast<unsigned char>(text[end - 1]))) {
        --end;
    }
    return text.substr(start, end - start);
}

std::vector<Field> parse_object(const std::string &text) {
    size_t pos = 0;
    std::vector<Field> fields;
    expect(text, pos, '{');
    skip_ws(text, pos);
    if (pos < text.size() && text[pos] == '}') {
        ++pos;
    } else {
        while (true) {
            std::string key = parse_string(text, pos);
            expect(text, pos, ':');
            fields.push_back({key, parse_value(text, pos)});
            skip_ws(text, pos);
            if (pos < text.size() && text[pos] == ',') {
                ++pos;
                continue;
            }
            expect(text, pos, '}');
            break;
        }
    }
    skip_ws(text, pos);
    if (pos != text.size()) {
        throw std::invalid_argument("trailing JSON input");
    }
    return fields;
}

std::string unquote(const std::string &value) {
    if (value.size() < 2 || value.front() != '"' || value.back() != '"') {
        return value;
    }
    size_t pos = 0;
    return parse_string(value, pos);
}
}

std::map<std::string, std::string> rdf_json_ld_to_ngsi_ld(const std::string &rdfJsonLd) {
    std::map<std::string, std::string> ngsiLd = {
        {"id", "urn:ngsi-ld:unknown:id"},
        {"type", "UnknownType"},
        {"@context", "https://schema.lab.fiware.org/ld/context"},
        {"attributes", "[]"},
    };
    std::string attributes = "[";
    bool first = true;

    for (const auto &field : parse_object(rdfJsonLd)) {
        if (field.key == "@id") {
            ngsiLd["id"] = unquote(field.value);
        } else if (field.key == "@type") {
            ngsiLd["type"] = unquote(field.value);
        } else if (field.key == "@context") {
            ngsiLd["@context"] = unquote(field.value);
        } else {
            if (!first) {
                attributes += ",";
            }
            first = false;
            attributes += R"({"type":"Property","name":")" + field.key + R"(","value":)" + field.value + "}";
        }
    }

    attributes += "]";
    ngsiLd["attributes"] = attributes;
    return ngsiLd;
}
