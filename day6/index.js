const express = require("express");

const app = express();

app.use((req, _, next) => {
    console.log("new request", req.url, req.method);
    next();
});

app.use(express.static("assets/pages"));
app.use(express.static("assets/css"));
app.use(express.static("assets/fonts"));
app.use(express.static("assets/img"));

app.use((_, res) => {
    res.status(404).send("<h1>nichts gefunden</h1>");
});

const PORT = 8001;

app.listen(PORT, () => console.log("Server is listening  on port", PORT));
