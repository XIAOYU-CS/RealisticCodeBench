#!/usr/bin/env node

/**
 * Environment Variable Replacement Tool
 * Fixes included:
 * 1. Added escaping for regular expression special characters to handle symbols like $, [, ]
 * 2. Corrected replacement logic to ensure global replacements are executed properly
 * 3. Removed process.exit to prevent test environment interruptions
 */

const log = {
  debug: () => {},
  info: (message) => console.log(`INFO: ${message}`),
  warning: (message) => console.log(`WARNING: ${message}`),
  error: (message) => console.error(`ERROR: ${message}`)
};

/**
 * Escapes special characters in a regular expression
 * @param {string} str - The string that needs escaping
 * @returns {string} The escaped string
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义所有正则特殊字符
}

function replacePlaceholders(content, envVars, formatType) {
  const formats = {
    '${}': ['${', '}'],
    '{{}}': ['{{', '}}'],
    '%%': ['%%', '%%'],
    '[]': ['[', ']']
  };
  const format = formats[formatType];
  if (!format) {
    throw new Error(`Unsupported format: ${formatType}`);
  }

  const [prefix, suffix] = format;
  let result = content;
  for (const [key, value] of Object.entries(envVars)) {
    const placeholder = `${prefix}${key}${suffix}`;
    result = result.replace(new RegExp(escapeRegExp(placeholder), 'g'), () => value);
  }
  return result;
}

/**
 * Loads .env file content into an object, ignoring comments and empty lines
 * @param {string} envPath - Path to the .env file
 * @returns {Object} Environment variables as key-value pairs
 */
async function loadEnvFile(envPath) {
  try {
    const envVars = {};
    const fs = require('fs').promises;
    const content = await fs.readFile(envPath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const line = lines[i].trim();

      if (!line || line.startsWith('#')) continue;
      if (!line.includes('=')) {
        log.warning(`Ignoring line ${lineNum} in .env file: invalid format (missing equals sign)`);
        continue;
      }

      const [key, ...valueParts] = line.split('=');
      envVars[key.trim()] = valueParts.join('=').trim(); // 支持值中包含等号
    }

    log.info(`Successfully loaded ${Object.keys(envVars).length} environment variables from ${envPath}`);
    return envVars;
  } catch (err) {
    if (err.code === 'ENOENT') {
      log.error(`.env file not found: ${envPath}`);
    } else {
      log.error(`Failed to load .env file: ${err.message}`);
    }
    throw err; // 抛出错误而非终止进程
  }
}
