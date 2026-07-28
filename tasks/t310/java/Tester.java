package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.Map;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testHeapMapping() {
        String mapsLine = "55c12b4d6000-55c12b4f7000 rw-p 00000000 00:00 0 [heap]";
        Map<String, String> result = Answer.classifyMemoryMapping(mapsLine);
        assertEquals("heap", result.get("type"));
    }

    @Test
    public void testStackMapping() {
        String mapsLine = "7fff5c1a2000-7fff5c1c3000 rw-p 00000000 00:00 0 [stack]";
        Map<String, String> result = Answer.classifyMemoryMapping(mapsLine);
        assertEquals("stack", result.get("type"));
    }

    @Test
    public void testVdsoMapping() {
        String mapsLine = "7fff5c1c3000-7fff5c1c5000 r-xp 00000000 00:00 0 [vdso]";
        Map<String, String> result = Answer.classifyMemoryMapping(mapsLine);
        assertEquals("vdso", result.get("type"));
    }

    @Test
    public void testFileBackedMapping() {
        String mapsLine = "7f8b8c000000-7f8b8c021000 r--p 00000000 08:01 123456 /lib/x86_64-linux-gnu/libc.so.6";
        Map<String, String> result = Answer.classifyMemoryMapping(mapsLine);
        assertEquals("file", result.get("type"));
    }

    @Test
    public void testDeviceMapping() {
        String mapsLine = "7f8b8c021000-7f8b8c022000 rw-p 00000000 08:01 789012 /dev/zero";
        Map<String, String> result = Answer.classifyMemoryMapping(mapsLine);
        assertEquals("device", result.get("type"));
    }

    @Test
    public void testAnonymousMapping() {
        String mapsLine = "55c12b4d5000-55c12b4d6000 rw-p 00000000 00:00 0";
        Map<String, String> result = Answer.classifyMemoryMapping(mapsLine);
        assertEquals("anonymous", result.get("type"));
    }

    @Test
    public void testUnknownMapping() {
        String mapsLine = "55c12b4d5000-55c12b4d6000 rw-p 00000000 00:00 0 special_mapping";
        Map<String, String> result = Answer.classifyMemoryMapping(mapsLine);
        assertEquals("unknown", result.get("type"));
    }
}
