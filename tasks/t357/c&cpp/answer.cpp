#include "signature.cpp"

#include <algorithm>
#include <stdexcept>
#include <unordered_map>

static std::string page_key(const PageValue& value) {
    if (const auto* int_value = std::get_if<int>(&value)) {
        return "i:" + std::to_string(*int_value);
    }
    if (const auto* text = std::get_if<std::string>(&value)) {
        return "s:" + *text;
    }
    throw std::invalid_argument("Each page must have an id property");
}

static bool is_null_value(const PageValue& value) {
    return std::holds_alternative<std::nullptr_t>(value);
}

static bool is_root_parent(const PageValue& value) {
    if (is_null_value(value)) {
        return true;
    }
    const auto* text = std::get_if<std::string>(&value);
    return text != nullptr && text->empty();
}

std::vector<Page> build_tree_with_sort(
    const std::vector<Page>& pages,
    std::function<int(const Page&, const Page&)> sort_fn) {
    std::unordered_map<std::string, Page> node_map;
    std::unordered_map<std::string, std::vector<std::string>> children_by_parent;
    std::vector<std::string> root_keys;

    for (const Page& page : pages) {
        auto id = page.find("id");
        if (id == page.end() || is_null_value(id->second)) {
            throw std::invalid_argument("Each page must have an id property");
        }

        Page node = page;
        node["items"] = PageItems{};
        node_map[page_key(id->second)] = std::move(node);
    }

    for (const Page& page : pages) {
        const std::string id_key = page_key(page.at("id"));
        auto parent = page.find("parentFolder");

        if (parent != page.end() && !is_root_parent(parent->second)) {
            const std::string parent_key = page_key(parent->second);
            if (node_map.find(parent_key) != node_map.end()) {
                children_by_parent[parent_key].push_back(id_key);
            }
        } else {
            root_keys.push_back(id_key);
        }
    }

    std::function<Page(const std::string&)> materialize = [&](const std::string& key) {
        Page node = node_map.at(key);
        PageItems children;
        for (const std::string& child_key : children_by_parent[key]) {
            children.push_back(materialize(child_key));
        }
        node["items"] = std::move(children);
        return node;
    };

    PageItems tree;
    for (const std::string& key : root_keys) {
        tree.push_back(materialize(key));
    }

    std::function<void(PageItems&)> sort_nodes = [&](PageItems& nodes) {
        if (sort_fn) {
            std::stable_sort(nodes.begin(), nodes.end(), [&](const Page& left, const Page& right) {
                return sort_fn(left, right) < 0;
            });
        }
        for (Page& node : nodes) {
            sort_nodes(std::get<PageItems>(node["items"]));
        }
    };

    sort_nodes(tree);
    return tree;
}
