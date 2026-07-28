import { tmpdir } from 'os';
import * as path from 'path';

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('Environment Variable Replacer', () => {
  test('should replace ${} format placeholders correctly', () => {
    const envVars = { DB_HOST: 'localhost', DB_PORT: '5432' };
    const content = 'Database: ${DB_HOST}:${DB_PORT}';
    const result = replacePlaceholders(content, envVars, '${}');

    expect(result).toBe('Database: localhost:5432');
  });

  test('should process all supported placeholder formats', () => {
    const envVars = { APP_NAME: 'MyApp', VERSION: '1.0.0' };

    expect(replacePlaceholders('App: {{APP_NAME}} (v{{VERSION}})', envVars, '{{}}'))
      .toBe('App: MyApp (v1.0.0)');

    expect(replacePlaceholders('Version: %%VERSION%%', envVars, '%%'))
      .toBe('Version: 1.0.0');

    expect(replacePlaceholders('Name: [APP_NAME]', envVars, '[]'))
      .toBe('Name: MyApp');
  });

  test('should parse .env files and ignore comments/invalid lines', () => {
    // Create unique temporary file
    const tempFilePath = path.join(tmpdir(), `test-env-${Date.now()}.env`);

    const envContent = `
# This is a comment
DB_HOST=localhost

# Empty line above this comment
DB_PORT=5432

INVALID_LINE_WITHOUT_EQUALS
DB_USER=admin
DB_PASS=secret=with=equals

# Another comment
DEBUG=true
`;
    fs.writeFileSync(tempFilePath, envContent, 'utf8');

    const envVars = loadEnvFile(tempFilePath);
    expect(envVars).toEqual({
      DB_HOST: 'localhost',
      DB_PORT: '5432',
      DB_USER: 'admin',
      DB_PASS: 'secret=with=equals',
      DEBUG: 'true'
    });

    fs.unlinkSync(tempFilePath);
  });

  test('should preserve unmatched placeholders', () => {
    const envVars = { EXISTING: 'value' };
    const content = `
Matched: \${EXISTING}
Unmatched: \${MISSING}
Another: {{UNMATCHED}}
`;
    const result = replacePlaceholders(content, envVars, '${}');

    expect(result).toBe(`
Matched: value
Unmatched: \${MISSING}
Another: {{UNMATCHED}}
`);
  });

  test('should reject unsupported placeholder formats', () => {
    expect(() => replacePlaceholders('test: <<VALUE>>', { VALUE: 'ok' }, '<<>>'))
      .toThrow('Unsupported format');
  });

});
