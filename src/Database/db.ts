import mongoose from "mongoose";

export const url =
  "mongodb+srv://izzudin:asusz007@cluster0-s44zf.mongodb.net/urlShorter";

export const connect = async () =>
  await mongoose.connect(url, { useNewUrlParser: true });

export const checkConnection = () => {
  mongoose.connection.on("connected", () => {
    console.log("Mongoose Successfull Connect");
  });
  mongoose.connection.on("error", (err) =>
    console.log(`MongoDB Error : ${err}`)
  );
};
