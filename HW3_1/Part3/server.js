const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

let items = [];

app.get("/", (req, res) => {
  res.render("index", { items });
});

app.post("/addItem", (req, res) => {
  const itemInput = req.body.itemInput.trim();
  if(itemInput !== "") {
    items.push(itemInput);
  }
  res.redirect("/");
});

app.post("/deleteItem", (req, res) => {
  const index = parseInt(req.body.index);
  if(index >= 0 && index < items.length) {
    items.splice(index, 1);
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`WebAPP HW3-1-3 listens on port ${PORT}.`);
});
