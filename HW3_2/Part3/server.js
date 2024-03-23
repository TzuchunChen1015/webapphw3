const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

let sendAlert = false;
let alertMessage = "";

let cityName = "";
let result = "";

app.get("/", (req, res) => {
  res.render("index", { sendAlert, alertMessage, cityName, result });
});

const fetchWeather = (city, res) => {
  const apiUrl = `https://wttr.in/${city}?format=%t+%w+%h`;
  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }
    return response.text();
  })
  .then(data => {
    sendAlert = false;
    result = data;
    res.redirect("/");
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
    sendAlert = true;
    alertMessage = "Failed to fetch weather data. Please try again later.";
    res.redirect("/");
  });
};

app.post("/search", (req, res) => {
  const cityInput = req.body.cityInput.trim();
  cityName = cityInput;
  if(cityInput !== "") {
    fetchWeather(cityInput, res);
  } else {
    sendAlert = true;
    alertMessage = "Please enter a city name.";
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`WebAPP HW3-2-3 listens on port ${PORT}.`);
});
