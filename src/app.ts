import DotEnv from "dotenv";
DotEnv.config();

import express from "express";
import http from "http";
import cors from "cors";

// Middlewares
import { errorMid } from "./middlewares/error";
import { notFoundMid } from "./middlewares/notfound";

// Eventos
import { onError, onListening } from "./listening/server";
import { onWarning, onUnhandledRejection } from "./listening/process";

import serverConfig from "./constants/serverConfig";

import { LoggerHTTP } from "./middlewares/loggerHttp";

import AuthModule from "./modules/Auth";
import SettingsModule from "./modules/Settings";
import { EnsureAuth } from "@middlewares/ensureAuth";

async function server(): Promise<void> {
  const app = express();
  const server = http.createServer(app);

  // Pré-middlewares
  app.disable("etag");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({ exposedHeaders: ["Authenticate"] }));
  app.use(LoggerHTTP);

  /**
   * Aqui entra o miolo da coisa...
   */
  app.get("/", (req, res) => {
    res.json({ message: "Joinha True" });
  });

  // Auth isolado.
  app.use("/api/auth", AuthModule);

  // A partir daqui, tudo com Auth.
  app.use("/api", EnsureAuth);
  app.use("/api/settings", SettingsModule);

  app.use(errorMid);
  app.use(notFoundMid);

  const port = serverConfig.port;

  // Configurando porta
  app.set("port", port);

  // Eventos do servidor
  server.on("error", onError(port));
  server.on("listening", onListening(serverConfig));

  // Colocando pra ouvir
  server.listen(port);
}

server();
// Listen process events.
process.on("warning", onWarning);
process.on("unhandledRejection", onUnhandledRejection);
