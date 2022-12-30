const fs = require("fs");

// Problem mit Asynchronem code -> Callback-Hell
// Promises
fs.readFile("package.json", (err, packageFileBuffer) => {
  if (err) {
    throw err;
  }

  const packageContentStr = packageFileBuffer.toString();
  const packageInfo = JSON.parse(packageContentStr);
  const mainFileName = packageInfo.main;

  fs.readFile(mainFileName, (err, mainFileBuff) => {
    if (err) {
      throw err;
    }

    const mainContentStr = mainFileBuff.toString();
    const lines = mainContentStr.split("\n").length;

    console.log(lines);
  });
});
