import re


_RULE_RE = re.compile(r'([^{}]+)\{([^{}]*)\}')


def extract_css_from_stylesheet(sheet):
    """
    Extracts CSS rules from a given CSS stylesheet.

    Args:
        sheet (str): A string representation of the CSS stylesheet.

    Returns:
        str: A concatenated string of CSS rules.
    """
    if not isinstance(sheet, str):
        return ''

    css_rules = []
    for selector, body in _RULE_RE.findall(sheet):
        selector = selector.strip()
        declarations = _normalize_declarations(body)
        if selector and declarations:
            css_rules.append(f'{selector} {{{declarations}}}')

    return ''.join(css_rules)


def _normalize_declarations(body):
    declarations = []
    for declaration in body.split(';'):
        declaration = declaration.strip()
        if declaration:
            declarations.append(re.sub(r'\s*:\s*', ': ', declaration) + ';')
    return ''.join(declarations)
