class Color {
  getColor(colorName) {
    return Color.RGB_VALUES[colorName];
  }

  getColorName(colorName) {
    return Color.NAMES[colorName] || "Unknown Color";
  }
}

Color.RED = "RED";
Color.GREEN = "GREEN";
Color.BLUE = "BLUE";
Color.YELLOW = "YELLOW";
Color.MAGENTA = "MAGENTA";
Color.CYAN = "CYAN";
Color.WHITE = "WHITE";
Color.BLACK = "BLACK";
Color.ORANGE = "ORANGE";
Color.PURPLE = "PURPLE";
Color.PINK = "PINK";
Color.BROWN = "BROWN";

Color.RGB_VALUES = {
  [Color.RED]: [255, 0, 0],
  [Color.GREEN]: [0, 255, 0],
  [Color.BLUE]: [0, 0, 255],
  [Color.YELLOW]: [255, 255, 0],
  [Color.MAGENTA]: [255, 0, 255],
  [Color.CYAN]: [0, 255, 255],
  [Color.WHITE]: [255, 255, 255],
  [Color.BLACK]: [0, 0, 0],
  [Color.ORANGE]: [255, 165, 0],
  [Color.PURPLE]: [128, 0, 128],
  [Color.PINK]: [255, 192, 203],
  [Color.BROWN]: [165, 42, 42],
};

Color.NAMES = {
  [Color.RED]: "Red",
  [Color.GREEN]: "Green",
  [Color.BLUE]: "Blue",
  [Color.YELLOW]: "Yellow",
  [Color.MAGENTA]: "Magenta",
  [Color.CYAN]: "Cyan",
  [Color.WHITE]: "White",
  [Color.BLACK]: "Black",
  [Color.ORANGE]: "Orange",
  [Color.PURPLE]: "Purple",
  [Color.PINK]: "Pink",
  [Color.BROWN]: "Brown",
};
