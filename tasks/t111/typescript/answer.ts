const childProcess = require('child_process');
const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

function runIpconfig(): Promise<{ stdout: string }> {
    return new Promise((resolve, reject) => {
        const exec = childProcess.exec as any;
        const result = exec('ipconfig', (error: Error | null, stdout: string) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout });
            }
        });
        if (result && typeof result.then === 'function') result.then(resolve, reject);
    });
}

async function getWindowsLocalIp(interfaceName: string = 'Wi-Fi'): Promise<string | null> {
    try {
        const { stdout = '' } = await runIpconfig();
        const ips = String(stdout).match(ipPattern) || [];
        return ips.find(ip => ip.startsWith('192.168.')) || null;
    } catch (error) {
        console.error(`Error executing command: ${error}`);
        return null;
    }
}
