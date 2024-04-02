import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { deserializeUser } from "./middlewares/deserializeUser";
import routes from "./routes";
import connectsToDB from "./utils/connect-db";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(deserializeUser);

const PORT = process.env.PORT || 1338;

app.listen(PORT, async () => {
  console.log("start listening on port " + PORT);
  await connectsToDB();

  routes(app);
});
