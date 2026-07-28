def crc8(data: bytes, polyval: int = 0xEB, init: int = 0xFF) -> int:
    """
    Computes the CRC8 check value of the input byte data

    Parameter:
        data: Input byte data
        polyval: CRC polynomial (8-bit integer, 0x00-0xFF)
        init: Initial value (8-bit integer, 0x00-0xFF)

    Return:
        The calculated CRC8 check value (0x00-0xFF)
    """
    if not isinstance(data, bytes):
        raise TypeError("data必须是bytes类型")
    if not (isinstance(polyval, int) and 0x00 <= polyval <= 0xFF):
        raise ValueError("polyval必须是8位整数（0x00-0xFF）")
    if not (isinstance(init, int) and 0x00 <= init <= 0xFF):
        raise ValueError("init必须是8位整数（0x00-0xFF）")

    crc = init
    for b in data:
        if not (0x00 <= b <= 0xFF):
            raise ValueError(f"数据中包含无效字节：{b}（必须是0-255范围内的整数）")

        crc ^= b
        for i in range(8):
            msb = crc & 0x80
            crc <<= 1
            if msb:
                crc ^= polyval
            crc &= 0xFF
    return crc & 0xFF


def verify_crc8(data: bytes, expected_crc: int, polyval: int = 0xEB, init: int = 0xFF) -> bool:
    """
    Verify whether the CRC8 checksum of the data matches the expected value

    Parameters:
        data: Input byte data
        expected_crc: Expected CRC8 checksum value
        polyval: CRC polynomial (8-bit integer, 0x00-0xFF)
        init: Initial value (8-bit integer, 0x00-0xFF)

    Returns:
        Verification result (True if they match, False otherwise)
    """
    if not (isinstance(expected_crc, int) and 0x00 <= expected_crc <= 0xFF):
        raise ValueError("expected_crc必须是8位整数（0x00-0xFF）")

    calculated_crc = crc8(data, polyval, init)
    return calculated_crc == expected_crc
