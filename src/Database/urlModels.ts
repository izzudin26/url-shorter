import { Schema, model } from "mongoose";

let urlSchema = new Schema({
  shortUrl: "string" as any,
  redirectUrl: "string" as any,
});

export const urlModel = model("urlCollection", urlSchema);
