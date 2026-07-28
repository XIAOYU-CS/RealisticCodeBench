function camelCaseToCapitalizedWithSpaces(input) {
    const sentence = input.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
