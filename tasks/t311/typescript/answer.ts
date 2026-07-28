import * as nodeFs from 'fs';
import * as nodePath from 'path';

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
): string {
    const normalizedBase = baseUrl.replace(/\/$/, '') + '/';

    const urls = new Set<string>([normalizedBase]);

    function walkDir(currentDir: string): void {
        const entries = nodeFs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = nodePath.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                walkDir(fullPath);
            } else if (entry.isFile()) {
                if (entry.name.endsWith('.htm') && !entry.name.includes('template')) {
                    const relPath = nodePath.relative(rootDir, fullPath);
                    
                    const urlPath = relPath.split(nodePath.sep).join('/');
                    
                    const encodedPath = encodeURIComponent(urlPath)
                        .replace(/%2F/g, '/')  // Preserve slashes
                        .replace(/%2E/g, '.'); // Preserve dots
                    
                    let rawUrl = normalizedBase + encodedPath;
                    
                    let finalUrl: string;
                    if (urlTransformFunc) {
                        finalUrl = urlTransformFunc(rawUrl, relPath, entry.name);
                    } else {
                        finalUrl = rawUrl;
                    }
                    
                    urls.add(finalUrl);
                }
            }
        }
    }

    walkDir(rootDir);

    const uniqueSortedUrls = Array.from(urls).sort();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    for (const url of uniqueSortedUrls) {
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(url)}</loc>\n`;
        xml += '  </url>\n';
    }
    
    xml += '</urlset>';

    console.log(`Added ${uniqueSortedUrls.length} pages to sitemap`);
    return xml;
}

/**
 * Escapes special XML characters to prevent invalid XML output
 * @param str - String to be escaped
 * @returns String with XML special characters escaped
 */
function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

