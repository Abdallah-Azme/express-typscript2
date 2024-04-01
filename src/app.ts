import dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectsToDB from "./utils/connect-db";
import routes from "./routes";
import { deserializeUser } from "./middlewares/deserializeUser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(deserializeUser);

const PORT = process.env.PORT || 1338;

app.listen(PORT, async () => {
  console.log("start listening on port " + PORT);
  await connectsToDB();

  routes(app);
});
