function byteArrayToHexString(byteArray: Uint8Array): string {
    return Array.from(byteArray)
        .map((value) => value.toString(16).padStart(2, "0").toUpperCase())
        .join("");
}
