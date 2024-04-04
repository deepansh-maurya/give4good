import express from "express";
import dotenv from "dotenv";
import { mongoDbConnect } from "./database/dbconnect.js";
dotenv.config({ path: "./env" });
const app = express();

mongoDbConnect()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("server is running......");
    });
  })
  .catch(() => {
    console.log("system failue");
  });
