describe('generatePackageName', () => {
  test('should generate package name from normal game name', () => {
    const result = generatePackageName('My Awesome Game');
    expect(result).toBe('com.my.awesome.game');
  });

  test('should handle special characters and various separators', () => {
    const result = generatePackageName('My-Game_Test 2023!');
    expect(result).toBe('com.my.game.test.2023');
  });

  test('should prepend "app" when leading number is not allowed', () => {
    const result = generatePackageName('123GameAdventure');
    expect(result).toBe('com.app.123gameadventure');
  });

  test('should allow leading number when configured', () => {
    const result = generatePackageName('123Game', {
      allowLeadingNumber: true
    });
    expect(result).toBe('com.123game');
  });

  test('should use custom prefix and separator', () => {
    const result = generatePackageName('My Game App', {
      prefix: 'org.games.',
      separator: '_',
      allowLeadingNumber: true
    });
    expect(result).toBe('org.games.my_game_app');
  });

  test('should return null for empty or invalid input', () => {
    expect(generatePackageName('')).toBeNull();
    expect(generatePackageName('   ')).toBeNull();
    expect(generatePackageName('!@#$%')).toBeNull();
  });
});