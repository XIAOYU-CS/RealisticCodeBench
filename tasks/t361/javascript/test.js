describe('parseDynamicId', () => {
  test('should extract dynamic value with default prefix and suffix', () => {
    const result = parseDynamicId('{userId}_profile_page');
    expect(result).toEqual({
      customId: 'profile_page',
      dynamicValue: 'userId'
    });
  });

  test('should work with custom prefix and suffix', () => {
    const result = parseDynamicId(
      '[productId]_details_view',
      false,
      { prefix: '[', suffix: ']_' }
    );
    expect(result).toEqual({
      customId: 'details_view',
      dynamicValue: 'productId'
    });
  });

  test('should return full value when no dynamic value found', () => {
    const result = parseDynamicId('static_page_name');
    expect(result).toEqual({
      customId: 'static_page_name'
    });
  });

  test('should work with custom regex', () => {
    const customRegex = /#(.+?)#/;
    const result = parseDynamicId(
      '#sessionId#dashboard',
      false,
      { regex: customRegex }
    );
    expect(result).toEqual({
      customId: 'dashboard',
      dynamicValue: 'sessionId'
    });
  });

  test('should include dynamicValue when required even if not found', () => {
    const result = parseDynamicId('static_content', true);
    expect(result).toEqual({
      customId: 'static_content',
      dynamicValue: undefined
    });
  });
});