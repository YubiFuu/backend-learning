const axios = require("axios");
const express = require("express");
const { paginationMenu } = require("./utils");

const app = express();

app.set("view engine", "ejs");

app.use((req, _, next) => {
    console.log("neue request", req.url, req.method);
    next();
});

app.use(express.static("public"));
app.get("/", (_, res) => res.redirect("/movies/1"));
app.get("/movies/:page", (req, res) => {
    const page = Number(req.params.page);
    const paginationArray = paginationMenu(page);
    axios
        .get(
            `https://api.themoviedb.org/3/movie/popular?api_key=05adb22c19b9412bdecd902b6ad3162e&language=en-US&page=${page}`,
            {
                headers: { "Accept-Encoding": "application/json" },
            }
        )
        .then((response) => {
            const movieResults = response.data.results;
            res.render("home", {
                movieResults,
                currentPage: page,
                paginationArray,
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendFile(__dirname + "public/server-error.html");
        });
});

app.get("/movie/:movieId", (req, res) => {
    const movieId = Number(req.params.movieId);

    const axiosOptions = { headers: { "Accept-Encoding": "application/json" } };
    const moviePromise = axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=05adb22c19b9412bdecd902b6ad3162e`,
        axiosOptions
    );

    Promise.all([moviePromise])
        .then(([movieResponse]) => {
            const movie = movieResponse.data;
            console.log(movie);
            res.render("movieDetails", { movie });
        })
        .catch((err) => {
            console.log(err);
            res.sendFile(__dirname + "/public/server-error.html");
        });
});

app.use((_, res) => {
    res.sendFile(__dirname + "/public/not-found.html");
});

const PORT = 8001;
app.listen(PORT, () => console.log("Server ready at Port", PORT));
