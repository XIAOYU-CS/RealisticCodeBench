package org.real.temp;

import org.junit.*;
import org.junit.rules.ExpectedException;

import java.util.*;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {
    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        Answer.GdbEnvironment.clear();
    }

    @Test
    public void testSuccessfulBreakpointCreation64bit() {
        Answer.GdbEnvironment.setMemory("0x1000", "0x2000");

        Map<String, List<Object>> result = Answer.invoke("0x1000 1 8", false);

        assertEquals(1, result.get("success").size());
        assertEquals(0, result.get("failed").size());

        String[] successEntry = (String[]) result.get("success").get(0);
        assertEquals("0x2000", successEntry[0]);
        assertEquals("1", successEntry[1]);
    }

    @Test
    public void testSuccessfulBreakpointCreation32bit() {
        Answer.GdbEnvironment.setMemory("0x1000", "0x2000");
        Map<String, List<Object>> result = Answer.invoke("0x1000 1 4", false);
        assertEquals(1, result.get("success").size());
        assertEquals(0, result.get("failed").size());
        String[] successEntry = (String[]) result.get("success").get(0);
        assertEquals("0x2000", successEntry[0]);
        assertEquals("1", successEntry[1]);
    }

    @Test
    public void testUnsupportedStepSize() {
        thrown.expect(Answer.GdbError.class);
        thrown.expectMessage("Unsupported step size 6. Use 4 (32-bit) or 8 (64-bit)");

        Answer.invoke("0x1000 1 6", false);
    }

    @Test
    public void testInvalidArguments() {
        thrown.expect(Answer.GdbError.class);
        thrown.expectMessage("Invalid arguments: Requires start_address [count] [step]");

        Answer.invoke("", false);
    }

    @Test
    public void testInvalidCount() {
        thrown.expect(Answer.GdbError.class);
        thrown.expectMessage("Invalid count -1: must be positive");

        Answer.invoke("0x1000 -1 8", false);
    }

    @Test
    public void testMultipleBreakpoints() {
        // 设置多个内存地址
        Answer.GdbEnvironment.setMemory("0x1000", "0x2000");
        Answer.GdbEnvironment.setMemory("0x1008", "0x2008");
        Answer.GdbEnvironment.setMemory("0x1010", "0x2010");

        Map<String, List<Object>> result = Answer.invoke("0x1000 3 8", false);

        assertEquals(3, result.get("success").size());
        assertEquals(0, result.get("failed").size());

        // 验证断点地址
        String[] successEntry1 = (String[]) result.get("success").get(0);
        assertEquals("0x2000", successEntry1[0]);

        String[] successEntry2 = (String[]) result.get("success").get(1);
        assertEquals("0x2008", successEntry2[0]);

        String[] successEntry3 = (String[]) result.get("success").get(2);
        assertEquals("0x2010", successEntry3[0]);
    }

    @Test
    public void testMemoryReadFailureWithInvalidFormat() {
        // 设置无效格式的内存值来测试格式错误
        Answer.GdbEnvironment.setMemory("0x1000", "invalid_format_without_colon");

        Map<String, List<Object>> result = Answer.invoke("0x1000 1 8", false);

        assertEquals(0, result.get("success").size());
        assertEquals(1, result.get("failed").size());

        String[] failedEntry = (String[]) result.get("failed").get(0);
        assertEquals("0x1000", failedEntry[0]);
        // 验证错误信息包含格式错误
        assertTrue(failedEntry[1].toString().contains("Invalid memory value format") ||
                  failedEntry[1].toString().contains("For input string"));
    }

    @Test
    public void testBreakpointCreationFailure() {
        // 测试参数解析错误
        thrown.expect(Answer.GdbError.class);
        thrown.expectMessage("Failed to parse arguments");

        Answer.invoke("invalid_address 1 8", false);
    }

    @Test
    public void testDefaultParameters() {
        Answer.GdbEnvironment.setMemory("0x1000", "0x2000");

        Map<String, List<Object>> result = Answer.invoke("0x1000 1", false); // 使用默认step参数

        assertEquals(1, result.get("success").size());
        assertEquals(0, result.get("failed").size());
    }

    @Test
    public void testMemoryAddressWithoutHexPrefix() {
        // 测试内存值不是以0x开头的情况
        Answer.GdbEnvironment.setMemory("0x1000", "2000"); // 不带0x前缀

        Map<String, List<Object>> result = Answer.invoke("0x1000 1 8", false);

        assertEquals(0, result.get("success").size());
        assertEquals(1, result.get("failed").size());

        String[] failedEntry = (String[]) result.get("failed").get(0);
        assertEquals("0x1000", failedEntry[0]);
        assertTrue(failedEntry[1].toString().contains("Invalid memory value format"));
    }
}
