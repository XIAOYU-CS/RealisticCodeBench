package org.real.temp;

public class Answer {
    public static String getLastPartOfFilepath(String filePath) {
        int pos = Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\'));
        return pos == -1 ? filePath : filePath.substring(pos + 1);
    }
}
