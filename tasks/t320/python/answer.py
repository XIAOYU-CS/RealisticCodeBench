#!/usr/bin/env python3


import argparse
import logging


def load_env_file(env_path):
    """
    Environment Variable Replacement Tool

    Function: Replaces environment variable placeholders in a specified file with actual values
    from a .env file. Supports multiple placeholder formats and provides detailed logging.

    Usage examples:
      python env_replace.py docker-compose.yaml --env_file .env.sample
      python env_replace.py config.template --format {{}}
    """
    env_vars = {}
    try:
        with open(env_path, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                if '=' not in line:
                    logging.warning(f"Ignoring line {line_num} in .env file: invalid format (missing equals sign)")
                    continue
                key, value = line.split('=', 1)
                env_vars[key.strip()] = value.strip()
        logging.info(f"Successfully loaded {len(env_vars)} environment variables from {env_path}")
        return env_vars
    except FileNotFoundError:
        logging.error(f".env file not found: {env_path}")
        raise
    except Exception as e:
        logging.error(f"Failed to load .env file: {str(e)}")
        raise