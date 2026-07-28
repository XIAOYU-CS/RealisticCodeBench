function getLastPartOfFilepath(filePath: string): string {
    const position = Math.max(filePath.lastIndexOf("/"), filePath.lastIndexOf("\\"));
    return position === -1 ? filePath : filePath.slice(position + 1);
}
