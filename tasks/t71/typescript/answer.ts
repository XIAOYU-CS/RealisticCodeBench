function invertDictionary(originalDict: Record<string, any>): Record<string, any> {
    const newDict: Record<string, any> = {};
    const parseKey = (key: string): string | number => /^-?\d+$/.test(key) ? Number(key) : key;
    for (const [key, value] of Object.entries(originalDict)) {
        const dictKey = String(value);
        if (!(dictKey in newDict)) {
            newDict[dictKey] = parseKey(key);
        } else {
            // If the value already exists as a key, we need to append to or create a list
            if (!Array.isArray(newDict[dictKey])) {
                newDict[dictKey] = [newDict[dictKey]];
            }
            newDict[dictKey].push(parseKey(key));
        }
    }
    return newDict;
}
