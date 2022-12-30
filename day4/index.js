const fs = require("fs");
const http = require("http");

function respondWithFile(fileName, response) {
    fs.readFile(fileName, (err, dataBuffer) => {
        if (err) {
            return response.end(
                "<h2>Fehler auf dem Server. Bitte versuchen Sie es etwas später nochmal</h2>"
            );
        }
        const fileString = dataBuffer.toString();
        response.write(fileString);
        response.end();
    });
}

const server = http.createServer((request, response) => {
    console.log("new request", request.url, request.method);

    if (request.url == "/" || request.url === "/home") {
        respondWithFile("assets/pages/index.html", response);
    } else if (request.url === "/services") {
        respondWithFile("assets/pages/services.html", response);
    } else if (request.url === "/contact") {
        respondWithFile("assets/pages/contact.html", response);
    } else if (request.url === "/about") {
        respondWithFile("assets/pages/about.html", response);
    } else if (request.url === "/style.css") {
        respondWithFile("assets/css/style.css", response);
    } else {
        response.end("<h2>404 Not Found </h2>");
    }
});

const PORT = 8001;
server.listen(PORT, () => console.log("Server is listening on port:", PORT));
