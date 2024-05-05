import express from "express";
import next from "next";
import path from "path";
import { parse } from "url";

const server = express();

const app = next({
  dir: path.join("..", "app"),
  dev: false,
  hostname: "0.0.0.0",
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  // server the federated modules
  server.use("/__federated", express.static(path.join("..", "ui", "dist")));

  // serve the next.js application
  server.use((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(3000, () => {
    console.log("[x] app running on: http//:127.0.0.1:3000");
  });
});
