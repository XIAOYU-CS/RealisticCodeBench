import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

function renameFiles(directory: string): void {
    const dirPath = path.resolve(directory);

    if (!fs.existsSync(dirPath) || !fs.lstatSync(dirPath).isDirectory()) {
        throw new Error(`The directory '${directory}' does not exist or is not a directory.`);
    }

    // Get list of PNG files in the directory
    const pngFiles = fs.readdirSync(dirPath).filter(file =>
        fs.lstatSync(path.join(dirPath, file)).isFile() && path.extname(file).toLowerCase() === '.png'
    );

    // Sort files alphabetically by their names
    pngFiles.sort();

    // Print the sorted list of files (for debugging)
    console.log("Sorted files:");
    pngFiles.forEach(file => {
        console.log(file);
    });

    // Rename files with sequence numbers
    let prevBaseName: string | null = null;
    let count = 1;

    pngFiles.forEach(file => {
        // Extract base name without postfix and number
        const baseName = path.parse(file).name.replace(/(\d{3})(-\d)?(?=\.png$)/, '');

        if (baseName !== prevBaseName) {
            count = 1;
        }

        const newFileName = `${baseName}${count.toString().padStart(3, '0')}.png`;
        const newFilePath = path.join(dirPath, newFileName);
        fs.renameSync(path.join(dirPath, file), newFilePath);
        console.log(`Renaming ${file} to ${newFileName}`);

        prevBaseName = baseName;
        count++;
    });
}
