interface TestPage extends Page {
  name: string;
  order?: number;
}

describe('buildTreeWithSort', () => {
    test('basic tree structure building', () => {
        const pages: TestPage[] = [
            { id: 1, parentFolder: null, name: 'Root' },
            { id: 2, parentFolder: 1, name: 'Child 1' },
            { id: 3, parentFolder: 1, name: 'Child 2' },
            { id: 4, parentFolder: 2, name: 'Grandchild 1' }
        ];

        const result = buildTreeWithSort(pages);

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(1);
        expect(result[0].name).toBe('Root');
        expect(result[0].items).toHaveLength(2);
        expect(result[0].items[0].id).toBe(2);
        expect(result[0].items[0].name).toBe('Child 1');
        expect(result[0].items[0].items).toHaveLength(1);
        expect(result[0].items[0].items[0].id).toBe(4);
        expect(result[0].items[1].id).toBe(3);
        expect(result[0].items[1].name).toBe('Child 2');
        expect(result[0].items[1].items).toHaveLength(0);
    });

    test('multiple root nodes', () => {
        const pages: TestPage[] = [
            { id: 1, parentFolder: null, name: 'Root 1' },
            { id: 2, parentFolder: null, name: 'Root 2' },
            { id: 3, parentFolder: 1, name: 'Child of Root 1' },
            { id: 4, parentFolder: 2, name: 'Child of Root 2' }
        ];

        const result = buildTreeWithSort(pages);

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);
        expect(result[0].name).toBe('Root 1');
        expect(result[1].id).toBe(2);
        expect(result[1].name).toBe('Root 2');
        expect(result[0].items).toHaveLength(1);
        expect(result[1].items).toHaveLength(1);
        expect(result[0].items[0].id).toBe(3);
        expect(result[1].items[0].id).toBe(4);
    });

    test('sorting functionality', () => {
        const pages: TestPage[] = [
            { id: 1, parentFolder: null, name: 'Z Root', order: 2 },
            { id: 2, parentFolder: null, name: 'A Root', order: 1 },
            { id: 3, parentFolder: 1, name: 'Z Child', order: 2 },
            { id: 4, parentFolder: 1, name: 'A Child', order: 1 },
            { id: 5, parentFolder: 2, name: 'B Child', order: 1 }
        ];

        const resultByName = buildTreeWithSort(pages, (a, b) => a.name.localeCompare(b.name));

        expect(resultByName[0].name).toBe('A Root');
        expect(resultByName[1].name).toBe('Z Root');

        expect(resultByName[1].items[0].name).toBe('A Child');
        expect(resultByName[1].items[1].name).toBe('Z Child');
        expect(resultByName[0].items[0].name).toBe('B Child');

        const resultByOrder = buildTreeWithSort(pages, (a, b) => (a.order || 0) - (b.order || 0));

        expect(resultByOrder[0].name).toBe('A Root');
        expect(resultByOrder[1].name).toBe('Z Root');
    });

    test('empty and edge cases', () => {
        const emptyResult = buildTreeWithSort([]);
        expect(emptyResult).toEqual([]);

        const rootOnlyPages: TestPage[] = [
            { id: 1, parentFolder: null, name: 'Root 1' },
            { id: 2, parentFolder: null, name: 'Root 2' }
        ];
        const rootOnlyResult = buildTreeWithSort(rootOnlyPages);
        expect(rootOnlyResult).toHaveLength(2);
        expect(rootOnlyResult[0].items).toHaveLength(0);
        expect(rootOnlyResult[1].items).toHaveLength(0);

        const pagesWithOrphans: TestPage[] = [
            { id: 1, parentFolder: null, name: 'Root' },
            { id: 2, parentFolder: 999, name: 'Orphan' },
            { id: 3, parentFolder: 1, name: 'Valid Child' }
        ];
        const resultWithOrphans = buildTreeWithSort(pagesWithOrphans);
        expect(resultWithOrphans).toHaveLength(1);
        expect(resultWithOrphans[0].items).toHaveLength(1);
        expect(resultWithOrphans[0].items[0].name).toBe('Valid Child');
    });

    test('input validation and error handling', () => {
        const validPages: TestPage[] = [
            { id: 1, name: 'Page 1' },
            { id: 2, name: 'Page 2' }
        ];
        const result = buildTreeWithSort(validPages);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
        expect(result[0].items).toHaveLength(0);
        expect(result[1].items).toHaveLength(0);
    });
});