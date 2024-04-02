import mongoose from "mongoose";

export default async function connectsToDB() {
  if (!process.env.MONGO_DB_URI)
    throw new Error("There is no db URI specified");
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connect database successfully ");
  } catch (error) {
    console.log("Error connecting to database ");
    process.exit(1);
  }
}
