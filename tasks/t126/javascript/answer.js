import fs from 'fs'
/**
 * Reads a JSON Lines file and returns its content as an array of objects.
 *
 * @param {string} filePath The path to the JSON Lines file.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of JSON objects parsed from the file.
 * @throws {Error} If the specified file does not exist or there is an error parsing a line in the JSON Lines file.
 */
async function readAndParseJsonl (filePath) {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`The file '${filePath}' does not exist.`);
  }

  const jsonList = [];
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
  let data = '';

  fileStream.on('data', (chunk) => {
    data += chunk;
  });

  return new Promise((resolve, reject) => {
    fileStream.on('end', () => {
      const lines = data.split('\n');
      for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed === '') {
          continue;
        }
        try {
          const jsonObj = JSON.parse(trimmed);
          jsonList.push(jsonObj);
        } catch (error) {
          reject(new Error(`Error parsing line: ${trimmed} - ${error.message}`));
          return;
        }
      }
      resolve(jsonList);
    });

    fileStream.on('error', (error) => {
      reject(error);
    });
  });
}
