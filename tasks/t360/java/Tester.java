package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.HashMap;
import java.util.Map;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testShouldGeneratePackageNameFromNormalGameName() {
        String result = Answer.generatePackageName("My Awesome Game");
        assertEquals("com.my.awesome.game", result);
    }

    @Test
    public void testShouldHandleSpecialCharactersAndVariousSeparators() {
        String result = Answer.generatePackageName("My-Game_Test 2023!");
        assertEquals("com.my.game.test.2023", result);
    }

    @Test
    public void testShouldPrependAppWhenLeadingNumberIsNotAllowed() {
        String result = Answer.generatePackageName("123GameAdventure");
        assertEquals("com.app.123gameadventure", result);
    }

    @Test
    public void testShouldAllowLeadingNumberWhenConfigured() {
        Map<String, Object> config = new HashMap<>();
        config.put("allowLeadingNumber", true);
        String result = Answer.generatePackageName("123Game", config);
        assertEquals("com.123game", result);
    }

    @Test
    public void testShouldUseCustomPrefixAndSeparator() {
        Map<String, Object> config = new HashMap<>();
        config.put("prefix", "org.games.");
        config.put("separator", "_");
        config.put("allowLeadingNumber", true);
        String result = Answer.generatePackageName("My Game App", config);
        assertEquals("org.games.my_game_app", result);
    }

    @Test
    public void testShouldReturnNoneForEmptyOrInvalidInput() {
        assertNull(Answer.generatePackageName(""));
        assertNull(Answer.generatePackageName("   "));
        assertNull(Answer.generatePackageName("!@#$%"));
        assertNull(Answer.generatePackageName(null));
    }

    @Test
    public void testAdditionalEdgeCases() {
        assertNull(Answer.generatePackageName("!@#$%^&*()"));
        String result = Answer.generatePackageName("MyAwesomeGame");
        assertEquals("com.myawesomegame", result);
        String result2 = Answer.generatePackageName("My---Game___Test");
        assertEquals("com.my.game.test", result2);
    }
}