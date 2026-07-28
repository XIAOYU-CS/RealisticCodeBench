import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';

async function createTestDir(structure: Record<string, string>): Promise<string> {
    const testDir = path.join(tmpdir(), `sitemap-test-${Date.now()}`);

    await fs.promises.mkdir(testDir, { recursive: true });

    for (const [relPath, content] of Object.entries(structure)) {
        const fullPath = path.join(testDir, relPath);
        await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.promises.writeFile(fullPath, content);
    }

    return testDir;
}

async function cleanupTestDir(dir: string): Promise<void> {
    if (fs.existsSync(dir)) {
        await fs.promises.rm(dir, { recursive: true, force: true });
    }
}

describe('generateSitemap', () => {
    let testDir: string;

    afterEach(async () => {
        if (testDir) {
            await cleanupTestDir(testDir);
        }
    });

    test('1. Should generate sitemap with base URL and all valid .htm files', async () => {
        testDir = await createTestDir({
            'index.htm': '',
            'about.htm': '',
            'contact.htm': '',
            'subdir/page.htm': ''
        });

        const sitemap = generateSitemap(testDir, 'https://example.com');

        expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
        expect(sitemap).toContain('<loc>https://example.com/</loc>');
        expect(sitemap).toContain('<loc>https://example.com/index.htm</loc>');
        expect(sitemap).toContain('<loc>https://example.com/about.htm</loc>');
        expect(sitemap).toContain('<loc>https://example.com/contact.htm</loc>');
        expect(sitemap).toContain('<loc>https://example.com/subdir/page.htm</loc>');
        expect((sitemap.match(/<url>/g) || []).length).toBe(5);
    });

    test('2. Should ignore template files and non-.htm files', async () => {
        testDir = await createTestDir({
            'index.htm': '',
            'template.htm': '',
            'header.template.htm': '',
            'page.html': '',
            'data.json': '',
            'scripts/app.js': ''
        });

        const sitemap = generateSitemap(testDir, 'https://example.com/');

        expect((sitemap.match(/<url>/g) || []).length).toBe(2);
        expect(sitemap).toContain('index.htm');
        expect(sitemap).not.toContain('template.htm');
        expect(sitemap).not.toContain('header.template.htm');
        expect(sitemap).not.toContain('page.html');
        expect(sitemap).not.toContain('data.json');
    });

    test('3. Should apply custom URL transformation function', async () => {
        testDir = await createTestDir({
            'index.htm': '',
            'about.htm': '',
            'blog/post.htm': ''
        });

        const transformer = (rawUrl: string) => {
            return rawUrl.replace(/\.htm$/, '/');
        };

        const sitemap = generateSitemap(testDir, 'https://example.com', transformer);

        expect(sitemap).toContain('<loc>https://example.com/index/</loc>');
        expect(sitemap).toContain('<loc>https://example.com/about/</loc>');
        expect(sitemap).toContain('<loc>https://example.com/blog/post/</loc>');
        expect(sitemap).not.toContain('.htm');
    });

    test('4. Should handle empty directory (only base URL)', async () => {
        testDir = path.join(tmpdir(), `sitemap-test-empty-${Date.now()}`);
        await fs.promises.mkdir(testDir, { recursive: true });

        const sitemap = generateSitemap(testDir, 'https://example.com');

        expect((sitemap.match(/<url>/g) || []).length).toBe(1);
        expect(sitemap).toContain('<loc>https://example.com/</loc>');
    });

    test('5. Should percent-encode spaces in root and nested paths', async () => {
        testDir = await createTestDir({
            'about us.htm': '',
            'docs/quick start.htm': ''
        });

        const sitemap = generateSitemap(testDir, 'https://example.com');

        expect(sitemap).toContain('<loc>https://example.com/about%20us.htm</loc>');
        expect(sitemap).toContain('<loc>https://example.com/docs/quick%20start.htm</loc>');
    });
});
