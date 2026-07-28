package org.real.temp;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class Answer {

    /**
     * Converts a date string from the format '%a, %d %b %Y %H:%M:%S %z (%Z)'
     * to the format '%Y-%m-%d_%H:%M:%S'.
     *
     * @param dateStr The input date string.
     * @return The formatted date string in the format '%Y-%m-%d_%H:%M:%S', or null if the input date string is invalid.
     */
    public static String reformatDateString(String dateStr) {
        SimpleDateFormat inputFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z '('z')'", Locale.ENGLISH);
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        outputFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        int zoneStart = dateStr.lastIndexOf(" (");
        if (zoneStart >= 5) {
            String offset = dateStr.substring(zoneStart - 5, zoneStart);
            if (offset.matches("[+-]\\d{4}")) {
                outputFormat.setTimeZone(TimeZone.getTimeZone("GMT" + offset.substring(0, 3) + ":" + offset.substring(3)));
            }
        }

        try {
            // Parse the input date string to a Date object
            Date dateObject = inputFormat.parse(dateStr);

            // Format the Date object to the desired output format
            String formattedDate = outputFormat.format(dateObject);

            return formattedDate;
        } catch (ParseException e) {
            System.out.println("Error parsing date: " + e.getMessage());
            return null;
        }
    }
}
