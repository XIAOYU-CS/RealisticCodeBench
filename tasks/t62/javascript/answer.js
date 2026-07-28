/**
 * Reads a log file containing JSON entries and extracts training loss and test accuracy.
 * Json entries such as {"test_acc1": 88.5, "train_loss": 0.75}
 *
 * @param {string} logFilePath - The path to the log file to be read.
 * @returns {Object} An object containing two arrays:
 * @property {Array<number>} trainLossList - An array of training loss values extracted from the log.
 * @property {Array<number>} testAcc1List - An array of test accuracy values extracted from the log.
 */
function readLog(logFilePath) {

    const fs = require('fs');
    let fileContent = fs.readFileSync(logFilePath, 'utf-8');
    let jsonEntries = fileContent.split('\n');
    let trainLossList = [];
    let testAcc1List = [];

    for(let entry of jsonEntries){
        if(entry.trim() !== ''){ // Check if it's not just whitespace
            let parsedEntry = JSON.parse(entry);
            if(parsedEntry.train_loss !== undefined) {
                trainLossList.push(parsedEntry.train_loss);
            }
            if(parsedEntry.test_acc1 !== undefined) {
                testAcc1List.push(parsedEntry.test_acc1);
            }
        }
    }

    return [trainLossList, testAcc1List];
}
