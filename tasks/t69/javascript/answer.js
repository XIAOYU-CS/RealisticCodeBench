function methodArgTypeCheck(methodObj, ...args) {
    const options = isTypeCheckOptions(args[args.length - 1]) ? args.pop() : {};
    const exclude = new Set(options.exclude || []);
    const expectedTypes = options.expectedTypes || {};
    const params = getParameterNames(methodObj);

    if (params.length === 0 && args.length > 0) {
        throw new TypeError('Invalid argument type');
    }

    params.forEach((param, index) => {
        if (exclude.has(param)) return;
        const arg = args[index];
        const expectedType = expectedTypes[param] || expectedTypes[index];

        if (arg === undefined || arg === null || !expectedType) return;
        if (typeof arg !== expectedType) {
            throw new TypeError(`Argument ${param} must be of type ${expectedType}, but got ${typeof arg}`);
        }
    });
}

function isTypeCheckOptions(value) {
    return value && typeof value === 'object' && !Array.isArray(value) &&
        (Object.prototype.hasOwnProperty.call(value, 'exclude') ||
            Object.prototype.hasOwnProperty.call(value, 'expectedTypes'));
}

function getParameterNames(methodObj) {
    const implementation = typeof methodObj.getMockImplementation === 'function'
        ? methodObj.getMockImplementation()
        : null;
    const source = (implementation || methodObj).toString();
    const match = source.match(/^[^(]*\(([^)]*)\)/) || source.match(/^\s*([^=()\s,]+)\s*=>/);

    if (!match || !match[1].trim()) return [];
    return match[1]
        .split(',')
        .map(param => param.trim().split(/[=?:]/)[0].trim())
        .filter(Boolean);
}
