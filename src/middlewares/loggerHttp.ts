import pinoHttp from "pino-http";

export const LoggerHTTP = pinoHttp({
  transport: {
    target: "pino-http-print",
    options: {
      colorize: true,
      all: false,
      translateTime: "SYS:standard",
      relativeUrl: true,
      lax: false,
    },
  },
});
