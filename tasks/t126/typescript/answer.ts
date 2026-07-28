import fs from 'fs';

/**
* Reads a JSON Lines file and returns its content as an array of objects.
*
* @param file_path - The path to the JSON Lines file.
* @returns An array of JSON objects parsed from the file.
* @throws {Error} If the specified file does not exist or there is an error parsing a line in the JSON Lines file.
*/
function readAndParseJsonl (file_path: string): Array<{ [key: string]: any }> {
   // Check if the file exists
   if (!fs.existsSync(file_path)) {
       throw new Error(`The file '${file_path}' does not exist.`);
   }

   const jsonList: Array<{ [key: string]: any }> = [];
   const fileContent = fs.readFileSync(file_path, 'utf8');
   const lines = fileContent.split('\n');

   for (const line of lines) {
       const trimmed = line.trim();
       if (trimmed === '') {
           continue;
       }
       try {
           const jsonObj = JSON.parse(trimmed);
           jsonList.push(jsonObj);
       } catch (error) {
           const message = error instanceof Error ? error.message : String(error);
           throw new Error(`Error parsing line: ${trimmed} - ${message}`);
       }
   }

   return jsonList;
}
