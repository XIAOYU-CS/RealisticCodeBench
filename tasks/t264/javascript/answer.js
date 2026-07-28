function readFileAndProcessLines(path) {
    return require('fs')
        .readFileSync(path, 'utf8')
        .split(/\r?\n/)
        .map(line => line.split('#')[0].trim())
        .filter(line => line.length > 0);
}
