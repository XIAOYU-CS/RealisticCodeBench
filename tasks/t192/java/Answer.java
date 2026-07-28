package org.real.temp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Answer {
    public static String getCurrentTimeFormatted() {
        String currentTime = System.getProperty("current.time");
        LocalDateTime currentDate = currentTime == null
                ? LocalDateTime.now()
                : LocalDateTime.parse(currentTime);
        return currentDate.format(DateTimeFormatter.ofPattern("h:mm a", Locale.US));
    }
}
