import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todos.js";
import url from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const __filename = url.fileURLToPath(import.meta.url); //FOR DEPLOYMENT
const __dirname = path.dirname(__filename); //FOR DEPLOYMENT

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/todos", todoRoutes);
app.use(express.static(path.join(__dirname, "../client/dist"))); //FOR DEPLOYMENT

//FOR DEPLOYMENT
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

mongoose
  .connect(`${process.env.MONGO_URL}/todos`)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
