function canClassToDict(obj) {
    return (obj !== null && typeof obj === "object" && !Array.isArray(obj)) || typeof obj === "function";
}
