require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api", (req, res, next) => {
  res.send("API Status: Running");
});

app.get("/search", (req, res, next) => {
  const { country, term } = req.query;
  const options = {
    method: "GET",
    url:
      "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
    params: { term, country },
    headers: {
      "x-rapidapi-key": process.env.API_KEY,
      "x-rapidapi-host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({status: "error", body: error });
    });
});

app.listen(3030, "0.0.0.0");
