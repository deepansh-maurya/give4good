import express from "express";
import dotenv from "dotenv";
import { mongoDbConnect } from "./database/dbconnect.js";
dotenv.config({ path: "./env" });
const app = express();
app.use(express.json());
mongoDbConnect()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("server is running......");
    });
  })
  .catch(() => {
    console.log("system failue");
  });

import router from "./routes/auth.routes.js";
app.use("/api/v1", router);
