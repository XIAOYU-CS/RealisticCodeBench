package org.real.temp;

import java.util.*;

public class Answer {

    public static class GdbError extends RuntimeException {
        public GdbError(String message) {
            super(message);
        }
    }

    public static class GdbEnvironment {
        private static Map<String, String> memory = new HashMap<>();
        private static Map<String, String> breakpoints = new HashMap<>();
        private static int breakpointCounter = 1;

        public static void setMemory(String address, String value) {
            memory.put(address, value);
        }

        public static void clear() {
            memory.clear();
            breakpoints.clear();
            breakpointCounter = 1;
        }

        public static String execute(String command, boolean toString) {
            if (command.startsWith("x/")) {
                // 内存读取命令
                String address = command.substring(command.indexOf(" ") + 1);
                String value = memory.get(address);
                if (value != null) {
                    return address + ": " + value;
                } else {
                    return address + ": 0x0";
                }
            } else if (command.startsWith("break *")) {
                // 断点设置命令
                String address = command.substring(6);
                String bpNum = String.valueOf(breakpointCounter++);
                breakpoints.put(address, bpNum);
                return "Breakpoint " + bpNum + " at " + address;
            }
            return "";
        }

        public static long parseAndEval(String expression) {
            if (expression.startsWith("0x")) {
                return Long.parseLong(expression.substring(2), 16);
            }
            return Long.parseLong(expression);
        }
    }

    /**
     * Enhanced batch breakpoint setup function with parameter configuration and error handling.
     *
     * Reads a series of addresses from a starting memory location and sets breakpoints at those addresses.
     * Supports configurable parameters and detailed error logging for memory access and breakpoint creation failures.
     */
    public static Map<String, List<Object>> invoke(String arg, boolean fromTty) {
        String[] args = arg.trim().split("\\s+");
        if (args.length < 1 || args[0].isEmpty()) {
            throw new GdbError("Invalid arguments: Requires start_address [count] [step]");
        }

        long startAddr;
        int count;
        int step;

        try {
            startAddr = GdbEnvironment.parseAndEval(args[0]);
            count = args.length > 1 ? Integer.parseInt(args[1]) : 53;
            step = args.length > 2 ? Integer.parseInt(args[2]) : 8;
        } catch (NumberFormatException e) {
            throw new GdbError("Failed to parse arguments: " + e.getMessage());
        }

        if (step != 4 && step != 8) {
            throw new GdbError("Unsupported step size " + step + ". Use 4 (32-bit) or 8 (64-bit)");
        }

        if (count <= 0) {
            throw new GdbError("Invalid count " + count + ": must be positive");
        }

        String xFormat = (step == 4) ? "w" : "g";
        String xCmd = "x/" + xFormat + "x";

        Map<String, List<Object>> results = new HashMap<>();
        results.put("success", new ArrayList<>());
        results.put("failed", new ArrayList<>());

        for (int i = 0; i < count * step; i += step) {
            long currentAddr = startAddr + i;
            String currentAddrHex = "0x" + Long.toHexString(currentAddr);

            try {
                String memResult = GdbEnvironment.execute(xCmd + " " + currentAddrHex, true);
                if (!memResult.contains(":")) {
                    throw new RuntimeException("Unexpected memory output format: " + memResult);
                }

                String[] parts = memResult.split(":");
                String targetHex = parts[1].trim().split("\\s+")[0];
                // 检查是否是有效的十六进制格式
                if (!targetHex.startsWith("0x")) {
                    throw new RuntimeException("Invalid memory value format: " + targetHex);
                }
                long targetAddr = Long.parseLong(targetHex.substring(2), 16);

                String breakResult = GdbEnvironment.execute("break *" + "0x" + Long.toHexString(targetAddr), true);
                if (!breakResult.contains("Breakpoint")) {
                    throw new RuntimeException("Breakpoint command failed: " + breakResult);
                }

                String[] breakParts = breakResult.split("\\s+");
                int bpNum = Integer.parseInt(breakParts[1].replace(":", ""));
                String[] successEntry = {"0x" + Long.toHexString(targetAddr), String.valueOf(bpNum)};
                results.get("success").add(successEntry);

            } catch (Exception e) {
                String[] failedEntry = {currentAddrHex, e.getMessage()};
                results.get("failed").add(failedEntry);
            }
        }

        System.out.println("\nBatch breakpoint summary:");
        System.out.println("  Successful: " + results.get("success").size() + " breakpoints");
        for (Object entry : results.get("success")) {
            String[] successEntry = (String[]) entry;
            System.out.println("    Breakpoint #" + successEntry[1] + " at " + successEntry[0]);
        }

        if (!results.get("failed").isEmpty()) {
            System.out.println("  Failed: " + results.get("failed").size() + " operations");
            for (Object entry : results.get("failed")) {
                String[] failedEntry = (String[]) entry;
                System.out.println("    Address " + failedEntry[0] + ": " + failedEntry[1]);
            }
        }

        return results;
    }
}
