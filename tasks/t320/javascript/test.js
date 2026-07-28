const fs = require('fs').promises;
const path = require('path');
const { tmpdir } = require('os');

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Environment Variable Replacement Tool', () => {
  test('should replace ${} format placeholders correctly', () => {
    const envVars = { DB_HOST: 'localhost', DB_PORT: '5432' };
    const content = 'db: ${DB_HOST}:${DB_PORT}';
    const result = replacePlaceholders(content, envVars, '${}');

    expect(result).toBe('db: localhost:5432');
  });

  test('should handle different placeholder formats', () => {
    const envVars = { USER: 'admin', PASS: 'secret' };

    expect(replacePlaceholders('user={{USER}}, pass={{PASS}}', envVars, '{{}}'))
      .toBe('user=admin, pass=secret');

    expect(replacePlaceholders('user=%%USER%%, pass=%%PASS%%', envVars, '%%'))
      .toBe('user=admin, pass=secret');

    expect(replacePlaceholders('user=[USER], pass=[PASS]', envVars, '[]'))
      .toBe('user=admin, pass=secret');
  });

  test('should leave undefined placeholders unchanged', () => {
    const envVars = { EXISTING_VAR: 'value' };
    const content = 'Existing: ${EXISTING_VAR}, Missing: ${MISSING_VAR}';
    const result = replacePlaceholders(content, envVars, '${}');
    expect(result).toBe('Existing: value, Missing: ${MISSING_VAR}');
  });

  test('should treat replacement values as literal strings', () => {
    const envVars = {
      PASSWORD: 'pa$$w0rd!@#',
      MESSAGE: 'Hello "World"',
      PATH: '/usr/local/bin'
    };
    const content = 'pass={{PASSWORD}}, msg={{MESSAGE}}, path={{PATH}}';
    const result = replacePlaceholders(content, envVars, '{{}}');

    expect(result).toBe('pass=pa$$w0rd!@#, msg=Hello "World", path=/usr/local/bin');
  });

  test('should reject unsupported placeholder formats', () => {
    expect(() => replacePlaceholders('test: <<VALUE>>', { VALUE: 'ok' }, '<<>>'))
      .toThrow('Unsupported format');
  });

});
