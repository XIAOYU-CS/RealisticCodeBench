const { Blob } = require("buffer");

/**
 * Converts a thread object to a JSON file represented as a Blob.
 * 
 * @param {Object} thread - The thread object to be converted.
 * @returns {Blob} - A Blob representing the JSON file.
 */
function convertThreadToJSONFile(thread) {
    return new Blob([JSON.stringify(thread)], { type: "application/json" });
}
