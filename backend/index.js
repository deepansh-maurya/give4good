import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { mongoDbConnect } from "./database/dbconnect.js";
import { handleSubmitForm } from "./controllers/auth.controller.js";

dotenv.config({ path: "./env" });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.post("/api/v1/form-submit", handleSubmitForm);
mongoDbConnect()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`server is running......${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("system failue");
  });

import router from "./routes/app.routes.js";
import exp from "constants";
app.use("/api/v1", router);
