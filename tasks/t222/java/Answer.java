package org.real.temp;

public class Answer {
    public static int[] convertBinaryStringToUint8Array(String binaryStr) {
        int byteCount = (binaryStr.length() + 7) / 8;
        int[] byteArray = new int[byteCount];

        for (int i = 0; i < byteCount; i++) {
            int start = i * 8;
            int end = Math.min(start + 8, binaryStr.length());
            byteArray[i] = Integer.parseInt(binaryStr.substring(start, end), 2);
        }

        return byteArray;
    }
}
