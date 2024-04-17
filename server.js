const express = require("express");
var body_parser = require("body-parser");

const routes = require("./src/routes/routes.js");

var app = express();

app.use(body_parser.json({ type: "application/json", limit: "25mb" }));

app.use("/api", routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/api`);
});
