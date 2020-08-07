import { Request, Response } from "express";
import { urlModel } from "../Database/urlModels";
import mongoose from "mongoose";

class UrlController {
  public async findUrl(req: Request, res: Response) {
    let { url } = req.params;
    return await urlModel
      .findOne({ shortUrl: url })
      .then((doc: any) => {
        let port = doc.redirectUrl.substring(0, 4);
        if (port == "http") {
          return res.status(301).redirect(doc.redirectUrl);
        } else {
          return res.status(301).redirect(`http://${doc.redirectUrl}`);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.send({ err }).status(500);
      });
  }

  public async storeUrl(req: Request, res: Response) {
    let { shortUrl, redirectUrl } = req.body;
    console.log(req.body);

    // check is url already in database
    const urlReady = await urlModel
      .find({
        redirectUrl,
      })
      .then((document: any) => {
        return document;
      })
      .catch((err) => res.send({ err }));

    if (urlReady.length > 0) {
      //if url has found in db
      return res.send({ status: "OK", data: urlReady[0] }).status(200);
    } else if (shortUrl) {
      //if url not found in DB and custom shortUrl not null
      await urlModel
        .create({
          shortUrl,
          redirectUrl: redirectUrl,
        })
        .then((result) => {
          return res.send({ status: "OK", data: result });
        })
        .catch((err) => {
          console.log({ error: err });
          return res.send(500);
        });
    } else {
      //if url not found inD DB and custom redirectUrl is null
      let _oid = mongoose.Types.ObjectId();
      await urlModel
        .create({
          _id: _oid,
          shortUrl: _oid.toString().substring(0, 6),
          redirectUrl: redirectUrl,
        })
        .then((result) => {
          console.log(result);
          return res.send({ response: "OK", data: result }).status(200);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500);
        });
    }
  }
}

export default new UrlController();
