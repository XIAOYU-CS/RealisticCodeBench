TEST_CASE("RDF JSON-LD to NGSI-LD conversion") {
    SECTION("basic conversion") {
        std::string rdf_jsonld = R"({"@context": "http://schema.org/", "@id": "urn:ngsi-ld:Vehicle:A123", "@type": "Vehicle", "speed": {"value": 60, "unitCode": "KMH"}})";
        std::map<std::string, std::string> expected = {
            {"id", "urn:ngsi-ld:Vehicle:A123"},
            {"type", "Vehicle"},
            {"@context", "http://schema.org/"},
            {"attributes", R"([{"type":"Property","name":"speed","value":{"value": 60, "unitCode": "KMH"}}])"},
        };
        REQUIRE(rdf_json_ld_to_ngsi_ld(rdf_jsonld) == expected);
    }

    SECTION("missing id and type use defaults") {
        std::string rdf_jsonld = R"({"@context": "http://schema.org/", "speed": {"value": 60, "unitCode": "KMH"}})";
        std::map<std::string, std::string> expected = {
            {"id", "urn:ngsi-ld:unknown:id"},
            {"type", "UnknownType"},
            {"@context", "http://schema.org/"},
            {"attributes", R"([{"type":"Property","name":"speed","value":{"value": 60, "unitCode": "KMH"}}])"},
        };
        REQUIRE(rdf_json_ld_to_ngsi_ld(rdf_jsonld) == expected);
    }

    SECTION("nested object attribute") {
        std::string rdf_jsonld = R"({"@context": "http://schema.org/", "@id": "urn:ngsi-ld:Vehicle:A123", "@type": "Vehicle", "location": {"latitude": 48.8566, "longitude": 2.3522}})";
        std::map<std::string, std::string> expected = {
            {"id", "urn:ngsi-ld:Vehicle:A123"},
            {"type", "Vehicle"},
            {"@context", "http://schema.org/"},
            {"attributes", R"([{"type":"Property","name":"location","value":{"latitude": 48.8566, "longitude": 2.3522}}])"},
        };
        REQUIRE(rdf_json_ld_to_ngsi_ld(rdf_jsonld) == expected);
    }

    SECTION("invalid JSON input throws") {
        REQUIRE_THROWS_AS(rdf_json_ld_to_ngsi_ld("This is not a valid JSON"), std::exception);
    }

    SECTION("empty JSON-LD document") {
        std::map<std::string, std::string> expected = {
            {"id", "urn:ngsi-ld:unknown:id"},
            {"type", "UnknownType"},
            {"@context", "https://schema.lab.fiware.org/ld/context"},
            {"attributes", "[]"},
        };
        REQUIRE(rdf_json_ld_to_ngsi_ld("{}") == expected);
    }
}
