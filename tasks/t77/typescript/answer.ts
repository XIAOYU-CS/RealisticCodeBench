function handleNestedData(data: any): any {
  if (Buffer.isBuffer(data)) {
      const decoded = data.toString('utf8');
      if (!data.equals(Buffer.from(decoded, 'utf8'))) {
          throw new Error('UnicodeDecodeError');
      }
      return decoded;
  } else if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
          // If it's an array, apply the function recursively to each item
          return data.map(item => handleNestedData(item));
      } else {
          // If it's an object (dictionary), apply the function recursively to each value
          const result: {[key: string]: any} = {};
          for (const key in data) {
              if (data.hasOwnProperty(key)) {
                  result[key] = handleNestedData(data[key]);
              }
          }
          return result;
      }
  } else if (typeof data === 'string') {
      // Try to convert strings that represent integers or floats to their numeric forms
      const num = Number(data);
      if (!isNaN(num)) {
          return num;
      }
      return data;  // Return the original string if it's not a number
  } else if (typeof data === 'number') {
      // If it's already a number, return as is
      return data;
  } else if (typeof data === 'bigint' || typeof data === 'boolean' || data === null) {
      // Return the value as is for other primitive types
      return data;
  }
  return data;  // Return the input as is for any other type
}
