package org.real.temp;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Answer {
    public static class RGB {
        public final int red;
        public final int green;
        public final int blue;

        public RGB(int red, int green, int blue) {
            this.red = red;
            this.green = green;
            this.blue = blue;
        }

        @Override
        public boolean equals(Object other) {
            if (!(other instanceof RGB)) {
                return false;
            }
            RGB rgb = (RGB) other;
            return red == rgb.red && green == rgb.green && blue == rgb.blue;
        }

        @Override
        public int hashCode() {
            return Objects.hash(red, green, blue);
        }
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

        private static final Map<String, RGB> RGB_VALUES = new HashMap<>();
        private static final Map<String, String> NAMES = new HashMap<>();

        static {
            put(RED, 255, 0, 0, "Red");
            put(GREEN, 0, 255, 0, "Green");
            put(BLUE, 0, 0, 255, "Blue");
            put(YELLOW, 255, 255, 0, "Yellow");
            put(MAGENTA, 255, 0, 255, "Magenta");
            put(CYAN, 0, 255, 255, "Cyan");
            put(WHITE, 255, 255, 255, "White");
            put(BLACK, 0, 0, 0, "Black");
            put(ORANGE, 255, 165, 0, "Orange");
            put(PURPLE, 128, 0, 128, "Purple");
            put(PINK, 255, 192, 203, "Pink");
            put(BROWN, 165, 42, 42, "Brown");
        }

        private static void put(String colorName, int red, int green, int blue, String displayName) {
            RGB_VALUES.put(colorName, new RGB(red, green, blue));
            NAMES.put(colorName, displayName);
        }

        public RGB getColor(String colorName) {
            return RGB_VALUES.get(colorName);
        }

        public String getColorName(String colorName) {
            return NAMES.getOrDefault(colorName, "Unknown Color");
        }
    }
}
