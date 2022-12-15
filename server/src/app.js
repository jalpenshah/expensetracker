import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import xss from "xss-clean";
import compression from "compression";
import cors from "cors";
import favicon from "serve-favicon";
import path from "path";

import logger from "./configs/logger";
import routes from "./routes";

const app = express(); // Initiating express object

// Middlewares
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
};

app.use(cors()); // Enable cors
app.options("*", cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet()); // Set security HTTP headers
app.use(express.json()); // Parse json request body
app.use(express.urlencoded({ extended: true })); // Parse urlencoded request body
app.use(xss()); // Sanitize request data
app.use(compression()); // Gzip compression
app.use(favicon(path.join(__dirname, "assets/logo-light.png"))); //Favicon

// Handling root request
app.get("/", (req, res) => {
  res
    .json({
      author: "Jalpen Shah",
      contact: "https://github.com/jalpenshah",
      type: "service",
    })
    .status(200);
});

// Configure routes
app.use("/api/v1", routes);

// Redirecting to 404 page for any unknown api request
app.use((req, res) => {
  logger.error(`Could not find resource for ${req.url}`);
  res.sendFile("assets/404.html", { root: __dirname });
});

export default app;
