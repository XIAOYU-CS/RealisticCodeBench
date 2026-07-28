type SortField = [string, boolean];
type MissingStrategy = 'default' | 'first' | 'last';

/**
 * Sort a list of objects by multiple fields with priority and handle missing fields.
 *
 * @param dictList - List of objects to be sorted
 * @param sortFields - List of [field_name, ascending] for sorting
 * @param missingStrategy - Strategy for handling missing fields ('default', 'first', 'last')
 * @param defaultValue - Default value when missing_strategy is 'default'
 * @returns Sorted list of objects
 */
function sortDictsByFields<T extends Record<string, any>>(
    dictList: T[],
    sortFields: SortField[],
    missingStrategy: MissingStrategy = 'default',
    defaultValue: any = null
): T[] {}