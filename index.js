import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Memories API");
});

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`App is lsitenong on port: ${PORT}`))
  )
  .catch((e) => console.log(e));
