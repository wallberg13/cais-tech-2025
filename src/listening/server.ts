import { ServerConfig } from "@constants/serverConfig";
import { Log } from "@helpers/Log";

interface Error {
  syscall: String;
  code: String;
}
/**
 * Evento que o servidor não conseguiu subir.
 */
export function onError(port: Number) {
  return (error: Error) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe" + port : "Porta " + port;

    switch (error.code) {
      case "EACCES":
        Log("Express.OnError", bind + " requer privilegios elevados.", "error");
        process.exit(1);
      case "EADDRINUSE":
        Log("Express.OnError", bind + " já está em uso!!", "error");
        process.exit(1);
      default:
        throw error;
    }
  };
}

/**
 * Evento que o servidor subiu.
 */
export function onListening(serverConfig: ServerConfig) {
  return () => {
    Log(
      "Express.OnListening",
      `🚀 Servidor Decolando em http://${serverConfig.host}:${serverConfig.port}`,
      "info"
    );
  };
}
