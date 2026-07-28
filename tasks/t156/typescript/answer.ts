function convertThreadToJSONFile(thread: object): Blob {
    return new Blob([JSON.stringify(thread)], { type: "application/json" });
}
