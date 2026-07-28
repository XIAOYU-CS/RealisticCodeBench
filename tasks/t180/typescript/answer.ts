function convertValueToAbbreviatedString(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === "") {
        return "";
    }

    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) {
        return "";
    }

    if (numberValue >= 1_000_000) {
        return `${(numberValue / 1_000_000).toFixed(1)}m`;
    }
    if (numberValue >= 1_000) {
        return `${(numberValue / 1_000).toFixed(1)}k`;
    }
    return String(Math.trunc(numberValue));
}
