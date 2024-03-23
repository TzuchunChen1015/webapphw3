const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("./public"));

app.listen(PORT, () => {
  console.log(`WebAPP HW3-1-2 listens on port ${PORT}.`);
});
