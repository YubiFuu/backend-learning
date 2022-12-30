// File System read + write
// Sync vs. Async
// Callbacks
// Callbacks-Nesting

const fs = require("fs");

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, fileBuffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(fileBuffer);
            }
        });
    });
}
function readLinesOfCode(fileName) {
    return readFile(fileName).then((packageFileBufferer) => {
        const bufferToText = packageFileBufferer.toString();
        const linesArray = bufferToText.split("\n");
        const linesOfCode = linesArray.length;
        return linesOfCode;
    });
}

fs.promises
    .readdir(process.cwd())
    .then((filesToFilter) => {
        let tempArray = [];
        const jsFiles = filesToFilter.filter((fileName) =>
            fileName.endsWith(".js")
        );

        jsFiles.map((fileName) => {
            tempArray.push(readLinesOfCode(fileName));
        });
        return Promise.all(tempArray);
    })
    .then((a) => {
        console.log(a);
        const totalLines = a.reduce((sumAcc, lines) => sumAcc + lines, 0);
        console.log("totalLinesofCode:", totalLines);
    })

    .catch((err) => {
        console.log(err);
    });
