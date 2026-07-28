package org.real.temp;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeParseException;

public class Answer {

    public static String calculateAgeFromBirthdate(String birthDateString) {
        if (birthDateString == null || birthDateString.isEmpty()) {
            return "";
        }

        LocalDate birthDate;
        try {
            birthDate = LocalDate.parse(birthDateString);
        } catch (DateTimeParseException e) {
            return "";
        }

        int age = Period.between(birthDate, LocalDate.now()).getYears();

        return birthDateString + " (" + age + ")";
    }
}
