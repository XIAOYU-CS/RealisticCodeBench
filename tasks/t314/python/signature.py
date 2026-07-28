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