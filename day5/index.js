const fs = require("fs");
const http = require("http");

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, dataBuffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(dataBuffer);
            }
        });
    });
}
const server = http.createServer((request, response) => {
    console.log("new request", request.url, request.method);

    const resource = request.url === "/" ? "/index" : request.url;

    const filePath = resource.includes(".")
        ? `assets${resource}`
        : `assets/pages${resource}.html`;

    readFile(filePath)
        .then((dataBuffer) => response.write(dataBuffer))
        .catch(() => response.write("<h1>Fehler auf dem Server</h1>"))
        .finally(() => response.end());
});
const PORT = 8001;
server.listen(PORT, () => console.log("Server is listening on port:", PORT));
