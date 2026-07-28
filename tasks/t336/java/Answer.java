package org.real.temp;

import java.nio.file.Path;
import java.nio.file.Paths;

public class Answer {

    /**
     * Check if the input string is a valid path format.
     *
     * @param pathStr The string to check for valid path format
     * @return bool: True if the string is a valid path format (absolute path or
     *               relative path with at least two parts), False otherwise
     */
    public static boolean isValidPathFormat(String pathStr) {
        if (pathStr == null) {
            return false;
        }

        try {
            Path path = Paths.get(pathStr);
            return path.isAbsolute() || path.getNameCount() > 1;
        } catch (Exception e) {
            return false;
        }
    }
}