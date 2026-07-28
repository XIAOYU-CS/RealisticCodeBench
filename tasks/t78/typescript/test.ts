describe('TestExtractSldTld', () => {
    it('test standard FQDN', () => {
        expect(extractSldTld("www.example.com")).toEqual(["example", "com"]);
    });

    it('test standard FQDN2', () => {
        expect(extractSldTld("www.example.xyz")).toEqual(["example", "xyz"]);
    });

    it('test FQDN with subdomains', () => {
        expect(extractSldTld("blog.subdomain.example.com")).toEqual(["example", "com"]);
    });

    it('test numeric TLD', () => {
        expect(extractSldTld("server.example.123")).toEqual(["example", "123"]);
    });

    it('test single-label domain throws', () => {
        expect(() => extractSldTld("localhost")).toThrow();
    });
});
