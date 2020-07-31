import express, { Application } from "express";
import { connect, checkConnection } from "./Database/db";
import bodyParse from "body-parser";
import controller from "./controller/urlController";
const port = process.env.PORT || 8080;

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.connection();
    this.plugin();
    this.routes();
  }
  connection(): void {
    connect();
    checkConnection();
  }
  plugin(): void {
    this.app.use(bodyParse.json());
  }
  routes(): void {
    this.app.get("/:url", controller.findUrl);
    this.app.post("/store-url", controller.storeUrl);
  }
}

let app = new App().app;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
