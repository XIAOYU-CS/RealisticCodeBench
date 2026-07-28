package org.real.temp;

import java.util.AbstractMap.SimpleEntry;

public class Answer {

    /**
     * Extracts the second-level domain (SLD) and top-level domain (TLD) from a fully qualified domain name (FQDN).
     *
     * @param fqdn The fully qualified domain name.
     * @return A pair containing the second-level domain and top-level domain.
     * @throws IllegalArgumentException if the provided FQDN does not contain enough parts to extract SLD and TLD.
     */
    public static SimpleEntry<String, String> extractSldTld(String fqdn) {
        // Split the FQDN into parts
        String[] parts = fqdn.split("\\.");

        // Check if there are enough parts to extract SLD and TLD
        if (parts.length < 2) {
            throw new IllegalArgumentException("The provided FQDN does not contain enough parts to extract SLD and TLD.");
        }

        // Extract the SLD and TLD
        String sld = parts[parts.length - 2];  // Second to last item is the SLD
        String tld = parts[parts.length - 1];  // Last item is the TLD

        return new SimpleEntry<>(sld, tld);
    }
}
