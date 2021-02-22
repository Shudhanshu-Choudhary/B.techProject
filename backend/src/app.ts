import * as express from "express";
import * as mongoose from "mongoose";
import { DB_URL } from "./constants/constants";

import * as cors from "cors";
import { config } from "dotenv";
import Logger from "./lib/logger";
import authRouter from "./controllers/auth.controller";
import bookingRouter from "./controllers/booking.controller";
import * as bodyParser from "body-parser";

config();

const app: any = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.once("open", () => {
  Logger.log("MongoDb is connected");
});

app.use(cors());

const port: string | number = process.env.PORT || 8888;

app.listen(port, () => {
  Logger.log(`Server listening on ${port}`);
});

app.use(express.static("client/build"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/booking", bookingRouter);

app.get("/", (req, res) => {
  res.send("Server Working");
});

