def convertToMathSansItalic(input):
    return ''.join(_convert_char(char) for char in input)


def _convert_char(char):
    if 'A' <= char <= 'Z':
        return chr(ord('𝑨') + ord(char) - ord('A'))
    if 'a' <= char <= 'z':
        return chr(ord('𝒂') + ord(char) - ord('a'))
    if '0' <= char <= '9':
        return chr(ord('𝟢') + ord(char) - ord('0'))
    return char
