const fs = require("fs");

// promises

/*
    Promise  Pending ---> Resolved => .then()
     State :    |
                +-------> Rejected => .catch()
*/

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    // async code comes here...
    fs.readFile(fileName, (err, fileBuffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(fileBuffer); // beim resolven wird der fileBuffer an .then() übergeben
      }
    });
  });
}

readFile("package.json")
  .then((packageFileBuffer) => {
    const packageContentStr = packageFileBuffer.toString();
    const packageInfo = JSON.parse(packageContentStr);
    return packageInfo.main; // -> das wird mainFileName auf Zeile 30 (im nächsten .then())
  })
  .then((mainFileName) => readFile(mainFileName))
  .then((mainFileBuff) => {
    const mainContentStr = mainFileBuff.toString();
    const lines = mainContentStr.split("\n").length;

    console.log(lines);
  })
  .catch((err) => {
    console.log(err); // egal aus welchem schritt in der .then() chain können wir hierher gelangen
  })
  .finally(() =>
    console.log(
      "egal ob resolved oder rejected, der finally-callback wird IMMER ausgeführt..."
    )
  );
