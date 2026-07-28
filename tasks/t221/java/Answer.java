package org.real.temp;
public class Answer {

    public static String convertBoolsToBinaryString(boolean[] boolArray) {
        StringBuilder binaryString = new StringBuilder();
        for (boolean value : boolArray) {
            binaryString.append(value ? "1" : "0");
        }
        return binaryString.toString();
    }
}