/**
 * Sorts a list of maps (dictionaries) by multiple fields with specified sort priorities
 * and configurable handling for missing fields.
 *
 * @param dictList        the list of maps to be sorted; each map represents a dictionary-like object
 * @param sortFields      a list of {@link SortField} objects specifying the field name and sort direction
 *                        ({@code true} for ascending, {@code false} for descending) in priority order
 * @param missingStrategy strategy to apply when a map is missing a field to sort by.
 *                        Supported values:
 *                        <ul>
 *                          <li>{@code "default"} – use the provided {@code defaultValue}</li>
 *                          <li>{@code "first"}  – place entries with missing fields at the beginning</li>
 *                          <li>{@code "last"}   – place entries with missing fields at the end</li>
 *                        </ul>
 * @param defaultValue    the fallback value to use when {@code missingStrategy} is {@code "default"}
 *                        and a field is missing from a map
 * @return                a new list containing the sorted maps; the original list is not modified
 */
public static List<Map<String, Object>> sortDictsByFields(
            List<Map<String, Object>> dictList,
            List<SortField> sortFields,
            String missingStrategy,
            Object defaultValue) {}