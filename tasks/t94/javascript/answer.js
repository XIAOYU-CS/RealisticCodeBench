function parseTypeHint(typeHintString) {
    const cleaned = typeHintString.replace(/(['"])(?:\\.|(?!\1).)*\1/g, "");
    const matches = cleaned.match(/[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*/g) || [];
    return matches.filter((name) => !["None", "True", "False"].includes(name));
}
