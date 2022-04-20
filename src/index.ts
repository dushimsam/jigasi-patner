const dotenv = require("dotenv");

if (process.env.NODE_ENV == "development")
  dotenv.config({ path: `.env.development` });
else dotenv.config();

const bodyparser =  require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const {app} = require("../config/express.config.ts");

import transcriptionHandler from "./routes/Transcription/transcription.routes";

const PORT = process.env.PORT || 3000;
const HOST =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_URL
    : `localhost:${PORT}`;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "JIGASI-PATNER APIs Documentation",
      version: "1.0.0",
      description:
        "Documentation of transcription apis for Jigasi server engine",
    },
    schemes: [process.env.NODE_ENV === "production" ? "https" : "http"],
    host: HOST,
    basePath: "/",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
  apis: [
    "index.ts",
    "./controllers/**/*.ts",
    "./controllers/**/**/*.ts",
    "./routes/**/*.ts",
    "./routes/**/**/*.ts",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.get("/documentation/docs.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, false, { docExpansion: "none" })
);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use("/api/v1/transcription", transcriptionHandler);
