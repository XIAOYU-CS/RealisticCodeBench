package org.real.temp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.Callable;

public class Answer {
    private static String ipconfigOutputForTest;
    private static Callable<String> ipconfigRunnerForTest;

    /**
     * Retrieve the local IP address of the specified network interface on Windows.
     *
     * @param interfaceName The name of the network interface to check (default is "Wi-Fi").
     * @return The local IP address if found, otherwise null.
     */
    public static String getWindowsLocalIp() {
        return getWindowsLocalIp("Wi-Fi");
    }

    public static String getWindowsLocalIp(String interfaceName) {
        try {
            String output = ipconfigOutputForTest != null ? ipconfigOutputForTest :
                    ipconfigRunnerForTest != null ? ipconfigRunnerForTest.call() : runIpconfig();
            return findLocalIp(output);
        } catch (IOException e) {
            System.out.println("Error executing command: " + e.getMessage());
            return null;
        } catch (Exception e) {
            System.out.println("An unexpected error occurred: " + e.getMessage());
            return null;
        }
    }

    static void setIpconfigOutputForTest(String output) {
        ipconfigOutputForTest = output;
    }

    static void setIpconfigRunnerForTest(Callable<String> runner) {
        ipconfigRunnerForTest = runner;
    }

    static void clearIpconfigOutputForTest() {
        ipconfigOutputForTest = null;
        ipconfigRunnerForTest = null;
    }

    private static String runIpconfig() throws IOException {
        Process process = Runtime.getRuntime().exec("ipconfig");
        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }
        return output.toString();
    }

    private static String findLocalIp(String output) {
        Pattern ipPattern = Pattern.compile("(\\d+\\.\\d+\\.\\d+\\.\\d+)");
        Matcher matcher = ipPattern.matcher(output);
        while (matcher.find()) {
            String ip = matcher.group(1);
            if (ip.startsWith("192.168.")) {
                return ip;
            }
        }
        return null;
    }
}
