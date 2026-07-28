describe("Color", () => {
  const color = new Color();

  test("returns RGB for red", () => {
    expect(color.getColor(Color.RED)).toEqual([255, 0, 0]);
  });

  test("returns RGB for green", () => {
    expect(color.getColor(Color.GREEN)).toEqual([0, 255, 0]);
  });

  test("returns RGB for blue", () => {
    expect(color.getColor(Color.BLUE)).toEqual([0, 0, 255]);
  });

  test("returns RGB for yellow", () => {
    expect(color.getColor(Color.YELLOW)).toEqual([255, 255, 0]);
  });

  test("returns RGB for magenta", () => {
    expect(color.getColor(Color.MAGENTA)).toEqual([255, 0, 255]);
  });

  test("returns RGB for cyan", () => {
    expect(color.getColor(Color.CYAN)).toEqual([0, 255, 255]);
  });

  test("returns RGB for white", () => {
    expect(color.getColor(Color.WHITE)).toEqual([255, 255, 255]);
  });

  test("returns RGB for black", () => {
    expect(color.getColor(Color.BLACK)).toEqual([0, 0, 0]);
  });

  test("returns RGB for orange", () => {
    expect(color.getColor(Color.ORANGE)).toEqual([255, 165, 0]);
  });

  test("returns RGB for purple", () => {
    expect(color.getColor(Color.PURPLE)).toEqual([128, 0, 128]);
  });

  test("returns RGB for pink", () => {
    expect(color.getColor(Color.PINK)).toEqual([255, 192, 203]);
  });

  test("returns RGB for brown", () => {
    expect(color.getColor(Color.BROWN)).toEqual([165, 42, 42]);
  });

  test("returns color names", () => {
    expect(color.getColorName(Color.RED)).toBe("Red");
    expect(color.getColorName(Color.BROWN)).toBe("Brown");
  });
});
