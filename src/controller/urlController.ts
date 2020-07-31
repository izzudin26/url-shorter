import { Request, Response } from "express";
import { urlModel } from "../Database/urlModels";

class UrlController {
  public async findUrl(req: Request, res: Response) {
    let { url } = req.params;
    return await urlModel
      .findOne({ shortUrl: url })
      .then((doc: any) => {
        return res.redirect(doc.redirectUrl);
      })
      .catch((err) => {
        console.log(err);
        return res.send({ err }).status(500);
      });
  }

  public async storeUrl(req: Request, res: Response) {
    let { shortUrl, redirectUrl } = req.body;
    return await urlModel
      .create({
        shortUrl,
        redirectUrl,
      })
      .then((result) => {
        return res.send({ response: "OK" }).status(200);
      })
      .catch((err) => {
        return res.status(500);
      });
  }
}

export default new UrlController();
