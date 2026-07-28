/**
 * Sort a list of objects by multiple fields with priority and handle missing fields.
 *
 * @param {Array} dictList - List of objects to be sorted
 * @param {Array} sortFields - List of arrays [field_name, ascending] for sorting
 *                              field_name (string): Name of the field to sort by
 *                              ascending (boolean): true for ascending order, false for descending
 * @param {string} missingStrategy - Strategy for handling missing fields
 *                                  'default' - Use default_value
 *                                  'first' - Missing fields come first
 *                                  'last' - Missing fields come last
 * @param {*} defaultValue - Default value when missing_strategy is 'default'
 *
 * @returns {Array} Sorted list of objects
 */
function sortDictsByFields(dictList, sortFields, missingStrategy = 'default', defaultValue = null) {}