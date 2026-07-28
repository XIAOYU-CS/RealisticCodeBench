const fs = require('fs');
const { load } = require('js-yaml');

/**
 * Convert a YAML file to a JSON file.
 *
 * @param {string} yamlFile - Path to the input YAML file.
 * @param {string} jsonFile - Path to the output JSON file.
 */
function convertYamlToJson(yamlFile, jsonFile) {
    // Read the YAML file
    const yamlData = fs.readFileSync(yamlFile, 'utf-8');
    // Parse YAML file using load
    const data = load(yamlData);

    // Write the data to a JSON file using standard JSON.stringify
    fs.writeFileSync(jsonFile, JSON.stringify(data === undefined ? null : data, null, 4), 'utf-8');
}
