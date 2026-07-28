package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testHideBankAccountValidCases() {
        assertEquals("****4567", Answer.maskBankAccountNumber("12345678901234567"));
        assertEquals("****6543", Answer.maskBankAccountNumber("98765432109876543"));
        assertEquals("****1100", Answer.maskBankAccountNumber("11111111111111100"));
    }

    @Test
    public void testHideBankAccountPreservesTrailingZeros() {
        assertEquals("****0000", Answer.maskBankAccountNumber("12345678901230000"));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testHideBankAccountShorterThan17Characters() {
        Answer.maskBankAccountNumber("1234567890123456");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testHideBankAccountLongerThan17Characters() {
        Answer.maskBankAccountNumber("123456789012345678");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testHideBankAccountWithZeroCharacters() {
        Answer.maskBankAccountNumber("");
    }
}
