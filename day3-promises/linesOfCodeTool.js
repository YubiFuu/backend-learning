// File System read + write
// Sync vs. Async
// Callbacks
// Callbacks-Nesting

const fs = require("fs");

function readLinesOfCode(fileName) {
  const fileContent = fs.readFileSync(fileName, "utf-8");
  const linesArray = fileContent.split("\n"); // \n -> new line
  const linesOfCode = linesArray.length;
  return linesOfCode;
}

// 1. alle dateien im ordner herauszufinden ?
fs.readdir("./", (err, files) => {
  if (err) {
    throw err;
  }
  // 2. alle .js dateien im files array einlesen...
  const jsFiles = files.filter((fileName) => fileName.endsWith(".js"));
  // 3. lines of code in allen .js dateien herausfinden
  const jsFileLines = jsFiles.map((fileName) => readLinesOfCode(fileName));
  // 4. totalLinesOfCode ermitteln....
  const totalLines = jsFileLines.reduce((sumAcc, lines) => sumAcc + lines, 0);
  console.log("totalLinesofCode:", totalLines);
});

// REPL = Read Evaluate Print Loop
// REPL Terminal öffnet man einfach mit "node"
