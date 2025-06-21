import pino from "pino";

export const LOG = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "hostname,pid",
      singleLine: true,
    },
  },
});

/**
 *
 * @param caller
 * @param msg
 * @param logType
 * @param data
 */
export const Log = (
  caller: string,
  msg: string | unknown = "",
  logType: "fatal" | "error" | "warn" | "info" | "debug" | "trace" = "info",
  data: any = undefined
) => {
  const objLog = { caller, msg };

  data && Object.assign(objLog, { data });

  LOG[logType](objLog);
};
