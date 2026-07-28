describe('TestIsCompliantIP', () => {
  test('test_private_ip', () => {
    expect(isCompliantIP('192.168.1.1')).toBe(true);
  });

  test('test_public_ip', () => {
    expect(isCompliantIP('8.8.8.8')).toBe(false);
  });

  test('test_invalid_ip', () => {
    expect(isCompliantIP('999.999.999.999')).toBe(false);
  });


  test('test_10_network_private_ips', () => {
    expect(isCompliantIP('10.0.0.1')).toBe(true);
    expect(isCompliantIP('10.255.255.254')).toBe(true);
  });

  test('test_172_16_to_172_31_private_ips', () => {
    expect(isCompliantIP('172.16.0.1')).toBe(true);
    expect(isCompliantIP('172.31.255.255')).toBe(true);
    expect(isCompliantIP('172.15.255.255')).toBe(false);
    expect(isCompliantIP('172.32.0.0')).toBe(false);
  });

  test('test_special_non_compliant_ips', () => {
    expect(isCompliantIP('127.0.0.1')).toBe(false);
    expect(isCompliantIP('169.254.1.1')).toBe(false);
    expect(isCompliantIP('0.0.0.0')).toBe(false);
    expect(isCompliantIP('224.0.0.1')).toBe(false);
  });

  test('test_malformed_ip_strings', () => {
    expect(isCompliantIP('192.168.1')).toBe(false);
    expect(isCompliantIP('192.168.1.1.1')).toBe(false);
    expect(isCompliantIP('192.168.-1.1')).toBe(false);
    expect(isCompliantIP('192.168.01.1')).toBe(false);
    expect(isCompliantIP('')).toBe(false);
    expect(isCompliantIP('192.168.1.')).toBe(false);
    expect(isCompliantIP('abc.def')).toBe(false);
  });
});
