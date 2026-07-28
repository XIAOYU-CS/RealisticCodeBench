package org.real.temp;

import java.util.AbstractMap.SimpleEntry;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testStandardFqdn() {
        SimpleEntry<String, String> result = Answer.extractSldTld("www.example.com");
        assertEquals(new SimpleEntry<>("example", "com"), result);
    }

    @Test
    public void testStandardFqdn2() {
        SimpleEntry<String, String> result = Answer.extractSldTld("www.example.xyz");
        assertEquals(new SimpleEntry<>("example", "xyz"), result);
    }

    @Test
    public void testFqdnWithSubdomains() {
        SimpleEntry<String, String> result = Answer.extractSldTld("blog.subdomain.example.com");
        assertEquals(new SimpleEntry<>("example", "com"), result);
    }

    @Test
    public void testNumericTld() {
        SimpleEntry<String, String> result = Answer.extractSldTld("server.example.123");
        assertEquals(new SimpleEntry<>("example", "123"), result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testSingleLabelDomainThrows() {
        Answer.extractSldTld("localhost");
    }
}
