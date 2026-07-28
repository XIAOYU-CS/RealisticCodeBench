function extractParseDictionaries(filePath: string): Object[] {
  const fs = require('fs');
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/\{[^{]*?\}/g);

  if (!matches) return [];

  const parsedDictionaries: Object[] = [];
  matches.forEach((dictString: string) => {
    try {
      parsedDictionaries.push(JSON.parse(dictString.replace(/'/g, '"')));
    } catch (error) {
      // Skip dictionary-like strings that are not valid object literals.
    }
  });
  return parsedDictionaries;
}
