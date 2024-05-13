const express = require("express");
var body_parser = require("body-parser");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Users API",
            description: "Users API Information",
            contact: {
                name: "Guilherme Huther",
            },
        },
        servers: [
            {
                url: "http://localhost:80/api",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};
const swaggerDocs = swaggerjsdoc(swaggerOptions);

const routes = require("./src/routes/routes.js");

var app = express();
app.use(body_parser.json({ type: "application/json", limit: "25mb" }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", routes);

const PORT = 80;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api`);
});
