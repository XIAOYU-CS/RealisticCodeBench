/**
 * Recursively converts string representations of numbers in a data structure to numeric types,
 * supporting custom conversion rules.
 *
 * @param data - Input data (nested object, array, or other basic types)
 * @param customConverters - A list of custom converter functions.
 *   Each function takes a string and returns the converted value.
 *   (If conversion fails, it's recommended to return the original string so that default conversion can continue.)
 * @returns The data structure after conversion
 */
function convertStringsToNumbers(
  data: any,
  customConverters: ((str: string) => any)[] | null = null
): any {}