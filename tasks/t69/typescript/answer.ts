type TypeCheckOptions = {
    exclude?: string[];
    expectedTypes?: Record<string, string>;
};

function methodArgTypeCheck(methodObj: Function, ...args: any[]): void {
    const maybeOptions = args[args.length - 1];
    const options: TypeCheckOptions = isTypeCheckOptions(maybeOptions) ? args.pop() : {};
    const exclude = new Set(options.exclude || []);
    const expectedTypes = options.expectedTypes || {};
    const params = getParameterNames(methodObj);

    params.forEach((param, index) => {
        if (exclude.has(param)) return;
        const value = args[index];
        const expectedType = expectedTypes[param] || expectedTypes[String(index)];

        if (value === undefined || value === null || !expectedType) return;
        if (typeof value !== expectedType) {
            throw new Error(`Argument '${param}' must be of type ${expectedType}, but got ${typeof value}`);
        }
    });
}

function method_arg_type_check(methodObj: Function, ...args: any[]): void {
    methodArgTypeCheck(methodObj, ...args);
}

function isTypeCheckOptions(value: unknown): value is TypeCheckOptions {
    return !!value && typeof value === 'object' && !Array.isArray(value) &&
        (Object.prototype.hasOwnProperty.call(value, 'exclude') ||
            Object.prototype.hasOwnProperty.call(value, 'expectedTypes'));
}

function getParameterNames(methodObj: Function): string[] {
    const source = methodObj.toString();
    const match = source.match(/^[^(]*\(([^)]*)\)/) || source.match(/^\s*([^=()\s,]+)\s*=>/);

    if (!match || !match[1].trim()) return [];
    return match[1]
        .split(',')
        .map(param => param.trim().split(/[=?:]/)[0].trim())
        .filter(Boolean);
}
