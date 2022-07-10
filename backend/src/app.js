import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mainHandler from "./handlers/errorHandlers";
import connectDB from "./db/connect";
import express from "express";
import auth from "./routes/auth";
import application from "./routes/application";
import constants from "./utils/constants";
import cors from "cors";

const app = express();

try {
  // Establish a database connection for node's process
  await connectDB();

  console.log("MongoDB Connected...");
} catch (error) {
  console.log("DB error", error);
}
// It shows the real origin IP in the heroku or Cloudwatch logs
app.enable("trust proxy");

// Enable Cross Origin Resource Sharing to all origins by default
app.use(
  cors({
    origin: "*",
  })
);
/**
 * @param {Object} req Request
 * @param {Object} res Response
 */
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Auth is Admin Routes
auth(app);

// Application is users route for add application
application(app);

// Handling Errors
app.use(mainHandler.celebrateErrors);
app.use(mainHandler.notFound);

app.listen(constants.port, () => {
  console.log(`The node server has started on port ${constants.port}`);
});
