public static class RGB {
    public final int red;
    public final int green;
    public final int blue;

    public RGB(int red, int green, int blue) {}
}

public static class Color {
    public static final String RED = "RED";
    public static final String GREEN = "GREEN";
    public static final String BLUE = "BLUE";
    public static final String YELLOW = "YELLOW";
    public static final String MAGENTA = "MAGENTA";
    public static final String CYAN = "CYAN";
    public static final String WHITE = "WHITE";
    public static final String BLACK = "BLACK";
    public static final String ORANGE = "ORANGE";
    public static final String PURPLE = "PURPLE";
    public static final String PINK = "PINK";
    public static final String BROWN = "BROWN";

    public RGB getColor(String colorName) {}

    public String getColorName(String colorName) {}
}
