/**
 * Find placeholders in the format {{ placeholder }} in the given text.
 * Supports multiple matching modes.
 *
 * Enhanced features:
 * - Supports placeholders containing letters, digits, underscores, dots, and hyphens.
 * - Optionally returns unique results.
 * - Optionally returns full placeholders (with {{}}) or just the inner content.
 * - Optionally allows empty placeholders (e.g., {{   }}).
 *
 * @param text Input text to search.
 * @param unique Whether to return unique results only. Default is false.
 * @param returnFull Whether to return full placeholders (with {{}}). Default is false.
 * @param allowEmpty Whether to allow empty placeholders. Default is false.
 * @return List of matched placeholders in the order they appear.
 * @throws IllegalArgumentException If the input text is null.
 */
public static List<String> findPlaceholders(
        String text,
        boolean unique,
        boolean returnFull,
        boolean allowEmpty) {}