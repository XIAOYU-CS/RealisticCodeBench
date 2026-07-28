
#include <string>
#include <vector>
#include <map>
#include <cstdlib>
#include <chrono>
#include <thread>
#include <stdexcept>
#include <cstring>
#include <memory>
#include <iostream>
#include <sstream>
#include <algorithm>

#ifdef _WIN32
#include <windows.h>
#else
#include <unistd.h>
#include <sys/wait.h>
#include <signal.h>
#endif

std::map<std::string, std::string> command_shell_safe(const std::vector<std::string>& args, int timeout = 30) {
    std::map<std::string, std::string> result;
    
    if (args.empty()) {
        result["status"] = "error";
        result["result"] = "[invalid argument]";
        return result;
    }

    try {
#ifdef _WIN32
        std::vector<std::string> cmd = {"cmd.exe", "/c"};
        cmd.insert(cmd.end(), args.begin(), args.end());
        DWORD creationFlags = CREATE_NO_WINDOW;
#else
        std::string joinedArgs;
        for (const auto& arg : args) {
            if (!joinedArgs.empty()) {
                joinedArgs += " ";
            }
            joinedArgs += arg;
        }
        std::vector<std::string> cmd = {"sh", "-c", joinedArgs};
        int creationFlags = 0;
#endif

        std::string stdoutStr, stderrStr;
        int exitCode = 0;

#ifdef _WIN32
        SECURITY_ATTRIBUTES saAttr;
        saAttr.nLength = sizeof(SECURITY_ATTRIBUTES);
        saAttr.bInheritHandle = TRUE;
        saAttr.lpSecurityDescriptor = NULL;

        HANDLE hStdoutRd, hStdoutWr;
        HANDLE hStderrRd, hStderrWr;
        CreatePipe(&hStdoutRd, &hStdoutWr, &saAttr, 0);
        CreatePipe(&hStderrRd, &hStderrWr, &saAttr, 0);
        SetHandleInformation(hStdoutRd, HANDLE_FLAG_INHERIT, 0);
        SetHandleInformation(hStderrRd, HANDLE_FLAG_INHERIT, 0);

        PROCESS_INFORMATION piProcInfo;
        STARTUPINFO siStartInfo;
        ZeroMemory(&piProcInfo, sizeof(PROCESS_INFORMATION));
        ZeroMemory(&siStartInfo, sizeof(STARTUPINFO));
        siStartInfo.cb = sizeof(STARTUPINFO);
        siStartInfo.hStdError = hStderrWr;
        siStartInfo.hStdOutput = hStdoutWr;
        siStartInfo.dwFlags |= STARTF_USESTDHANDLES;

        std::string cmdStr;
        for (const auto& arg : cmd) {
            if (!cmdStr.empty()) {
                cmdStr += " ";
            }
            cmdStr += arg;
        }

        BOOL success = CreateProcess(
            NULL,
            const_cast<char*>(cmdStr.c_str()),
            NULL,
            NULL,
            TRUE,
            creationFlags,
            NULL,
            NULL,
            &siStartInfo,
            &piProcInfo
        );

        if (!success) {
            CloseHandle(hStdoutRd);
            CloseHandle(hStdoutWr);
            CloseHandle(hStderrRd);
            CloseHandle(hStderrWr);
            result["status"] = "error";
            result["result"] = "[error] Failed to create process.";
            return result;
        }

        CloseHandle(hStdoutWr);
        CloseHandle(hStderrWr);

        auto startTime = std::chrono::steady_clock::now();
        while (true) {
            DWORD waitResult = WaitForSingleObject(piProcInfo.hProcess, 0);
            if (waitResult == WAIT_OBJECT_0) {
                break;
            }

            auto currentTime = std::chrono::steady_clock::now();
            auto elapsed = std::chrono::duration_cast<std::chrono::seconds>(currentTime - startTime).count();
            if (elapsed >= timeout) {
                TerminateProcess(piProcInfo.hProcess, 1);
                CloseHandle(piProcInfo.hProcess);
                CloseHandle(piProcInfo.hThread);
                CloseHandle(hStdoutRd);
                CloseHandle(hStderrRd);
                result["status"] = "error";
                result["result"] = "[error] Command timed out.";
                return result;
            }
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        }

        DWORD exitCodeWin;
        GetExitCodeProcess(piProcInfo.hProcess, &exitCodeWin);
        exitCode = static_cast<int>(exitCodeWin);

        char buffer[4096];
        DWORD bytesRead;
        while (ReadFile(hStdoutRd, buffer, sizeof(buffer), &bytesRead, NULL) && bytesRead != 0) {
            stdoutStr.append(buffer, bytesRead);
        }
        while (ReadFile(hStderrRd, buffer, sizeof(buffer), &bytesRead, NULL) && bytesRead != 0) {
            stderrStr.append(buffer, bytesRead);
        }

        CloseHandle(piProcInfo.hProcess);
        CloseHandle(piProcInfo.hThread);
        CloseHandle(hStdoutRd);
        CloseHandle(hStderrRd);
#else
        int stdoutPipe[2];
        int stderrPipe[2];
        pipe(stdoutPipe);
        pipe(stderrPipe);

        pid_t pid = fork();
        if (pid == 0) {
            close(stdoutPipe[0]);
            close(stderrPipe[0]);
            dup2(stdoutPipe[1], STDOUT_FILENO);
            dup2(stderrPipe[1], STDERR_FILENO);
            close(stdoutPipe[1]);
            close(stderrPipe[1]);

            std::vector<char*> argv;
            for (const auto& arg : cmd) {
                argv.push_back(const_cast<char*>(arg.c_str()));
            }
            argv.push_back(nullptr);

            execvp(argv[0], argv.data());
            exit(EXIT_FAILURE);
        } else if (pid > 0) {
            close(stdoutPipe[1]);
            close(stderrPipe[1]);

            auto startTime = std::chrono::steady_clock::now();
            int status;
            while (true) {
                int waitResult = waitpid(pid, &status, WNOHANG);
                if (waitResult == pid) {
                    break;
                } else if (waitResult == -1) {
                    break;
                }

                auto currentTime = std::chrono::steady_clock::now();
                auto elapsed = std::chrono::duration_cast<std::chrono::seconds>(currentTime - startTime).count();
                if (elapsed >= timeout) {
                    kill(pid, SIGKILL);
                    close(stdoutPipe[0]);
                    close(stderrPipe[0]);
                    result["status"] = "error";
                    result["result"] = "[error] Command timed out.";
                    return result;
                }
                std::this_thread::sleep_for(std::chrono::milliseconds(100));
            }

            if (WIFEXITED(status)) {
                exitCode = WEXITSTATUS(status);
            }

            char buffer[4096];
            ssize_t bytesRead;
            while ((bytesRead = read(stdoutPipe[0], buffer, sizeof(buffer))) > 0) {
                stdoutStr.append(buffer, bytesRead);
            }
            while ((bytesRead = read(stderrPipe[0], buffer, sizeof(buffer))) > 0) {
                stderrStr.append(buffer, bytesRead);
            }

            close(stdoutPipe[0]);
            close(stderrPipe[0]);
        } else {
            close(stdoutPipe[0]);
            close(stdoutPipe[1]);
            close(stderrPipe[0]);
            close(stderrPipe[1]);
            result["status"] = "error";
            result["result"] = "[error] Failed to fork process.";
            return result;
        }
#endif
        if (exitCode == 0) {
            if (!stdoutStr.empty()) {
                stdoutStr.erase(std::remove(stdoutStr.begin(), stdoutStr.end(), '\r'), stdoutStr.end());
                size_t end = stdoutStr.find_last_not_of('\n');
                if (end != std::string::npos) {
                    stdoutStr = stdoutStr.substr(0, end + 1);
                }
            }
            result["status"] = "success";
            result["result"] = stdoutStr.empty() ? "[command succeeded with no output]" : stdoutStr;
        } else {
            if (!stderrStr.empty()) {
                stderrStr.erase(std::remove(stderrStr.begin(), stderrStr.end(), '\r'), stderrStr.end());
                size_t end = stderrStr.find_last_not_of('\n');
                if (end != std::string::npos) {
                    stderrStr = stderrStr.substr(0, end + 1);
                }
            }
            result["status"] = "error";
            result["result"] = "[execution failed] Exit code: " + std::to_string(exitCode) + "\n" + stderrStr;
        }
    } catch (const std::exception& e) {
        result["status"] = "error";
        result["result"] = "[error] System exception: " + std::string(e.what());
    }

    return result;
}
