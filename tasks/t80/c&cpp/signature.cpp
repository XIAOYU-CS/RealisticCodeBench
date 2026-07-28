/**
 * @brief Convert the question in RDF JSON-LD format to NGSI-LD format.
 *
 * @param rdfJsonLd The RDF JSON-LD formatted question as a string.
 * @return A map containing NGSI-LD fields. The attributes field is encoded as JSON text.
 */
std::map<std::string, std::string> rdf_json_ld_to_ngsi_ld(const std::string& rdfJsonLd);
