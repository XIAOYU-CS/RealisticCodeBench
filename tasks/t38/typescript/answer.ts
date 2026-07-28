/**
 * Parse a XAML file and extract key-value pairs from 'String' elements.
 *
 * @param xamlFile - Path to the XAML file.
 * @returns A dictionary containing the key-value pairs extracted from 'String' elements.
 */
function parseXamlToDict(xamlFile: string): Record<string, string> {
    try {
        const fs = require('fs');
        const xamlContent = !xamlFile.includes('<') && fs.existsSync(xamlFile)
            ? fs.readFileSync(xamlFile, 'utf8')
            : xamlFile;
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser({ explicitArray: false, trim: false });
        let parsed: any = null;
        let failed = false;
        parser.parseString(xamlContent, (err, res) => {
            if (err) {
                failed = true;
            } else {
                parsed = res;
            }
        });
        if (failed || !parsed) return {};

        const resultDict: Record<string, string> = {};
        collectStrings(parsed, resultDict);
        return resultDict;
    } catch (error) {
        return {};
    }
}

function collectStrings(node: any, resultDict: Record<string, string>): void {
    if (Array.isArray(node)) {
        node.forEach((item) => collectStrings(item, resultDict));
        return;
    }
    if (!node || typeof node !== 'object') return;

    for (const [tag, child] of Object.entries(node)) {
        const children = Array.isArray(child) ? child : [child];
        for (const item of children) {
            if (isStringTag(tag) && item && typeof item === 'object') {
                const key = getKey(item.$ || {});
                if (key) resultDict[key] = typeof item._ === 'string' ? item._ : '';
            }
            collectStrings(item, resultDict);
        }
    }
}

function isStringTag(tag: string): boolean {
    return tag === 'String' || tag.endsWith(':String');
}

function getKey(attributes: Record<string, string>): string | undefined {
    const namespacedKey = Object.keys(attributes).find((name) => name.endsWith(':Key'));
    return attributes.Key || attributes['x:Key'] || (namespacedKey ? attributes[namespacedKey] : undefined);
}
