const express = require("express");
const { body, validationResult } = require("express-validator");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extrended: true }));

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

app.use((req, _, next) => {
    console.log("new request", req.method, req.url);
    next();
});

readFile("guestbook-entries.json")
    .then((fileBuffer) => {
        const packageContentStr = fileBuffer.toString();
        const packageInfo = JSON.parse(packageContentStr);
        return packageInfo;
    })
    .then((guestbookEntries) => {
        app.get("/", (_, res) => {
            res.render("home", { guestbookEntries });
        });
        app.post(
            "/add-guestbook-entry",
            body("name").isLength({ min: 2 }),
            body("email").isEmail(),
            body("messageText").isLength({ min: 3, max: 140 }),
            (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const message = {
                    name: req.body.name,
                    email: req.body.email,
                    messageText: req.body.messageText,
                    postedAt: new Date(),
                };
                guestbookEntries.push(message);
                const newGuestbook = JSON.stringify(guestbookEntries);
                fs.writeFile("guestbook-entries.json", newGuestbook, (err) => {
                    if (err) console.log(err);
                    else {
                        console.log("New guestbook entry added to JSON");
                    }
                });
                res.redirect("/");
            }
        );
    });

const PORT = 8001;
app.listen(PORT, () => console.log("Server listens at", PORT));
