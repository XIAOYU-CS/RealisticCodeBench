/**
 * Interface defining the structure of a URL transformation function
 * @param rawUrl - The original generated URL
 * @param relPath - Relative path from root directory to the file
 * @param filename - Name of the file being processed
 * @returns Transformed URL string
 */
type UrlTransformFunc = (rawUrl: string, relPath: string, filename: string) => string;

/**
 * Generates a website XML sitemap with support for custom URL transformation and flexible path handling
 * @param rootDir - Local path to the website's root directory
 * @param baseUrl - Base URL of the website (e.g., https://example.com/)
 * @param urlTransformFunc - Optional custom URL transformation function
 * @returns XML string representing the sitemap
 */
function generateSitemap(
    rootDir: string,
    baseUrl: string,
    urlTransformFunc?: UrlTransformFunc
): string {}