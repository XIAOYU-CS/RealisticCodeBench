function sortByField<T extends Record<string, any>>(array: readonly T[], field: keyof T, ascending: boolean = true): T[] {
    if (array.length === 0 || !(field in array[0])) {
        throw new Error("Field does not exist in the objects.");
    }

    return [...array].sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];
        if (typeof valueA === "number" && typeof valueB === "number") {
            return ascending ? valueA - valueB : valueB - valueA;
        }

        const textA = String(valueA).toLowerCase();
        const textB = String(valueB).toLowerCase();
        if (textA < textB) {
            return ascending ? -1 : 1;
        }
        if (textA > textB) {
            return ascending ? 1 : -1;
        }
        return 0;
    });
}
