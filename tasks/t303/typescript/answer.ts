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
): any {
  // Handle object type (but not null)
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = convertStringsToNumbers(value, customConverters);
    }
    return result;
  }

  // Handle array type
  else if (Array.isArray(data)) {
    return data.map(item => convertStringsToNumbers(item, customConverters));
  }

  // Handle string type
  else if (typeof data === 'string') {
    // Apply all custom conversion rules first
    if (customConverters && Array.isArray(customConverters)) {
      let converted: any = data;
      for (const converter of customConverters) {
        converted = converter(converted);
        // If already converted to a non-string type, stop further custom conversions
        if (typeof converted !== 'string') {
          return converted;
        }
      }
      // If still a string after custom conversion, continue with default conversion
      data = converted;
    }

    // Default conversion logic (int -> float -> keep original string)
    if (/^-?\d+$/.test(data)) {
      return parseInt(data, 10);
    } else {
      const floatVal = parseFloat(data);
      if (!isNaN(floatVal)) {
        return floatVal;
      } else {
        return data;
      }
    }
  }

  // Return other types directly
  else {
    return data;
  }
}