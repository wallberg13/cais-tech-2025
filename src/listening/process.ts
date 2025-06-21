import { Log } from "@helpers/Log";

export function onWarning(err: Error) {
  Log("Process Warning", err, "warn");
}

export function onUnhandledRejection(reason: unknown, p: Promise<unknown>) {
  Log("Process Unhandled Rejection", reason, "error");

  p.catch((err) => {
    console.log(err);
  });

  Log(
    "Process Unhandled Rejection",
    `Unhandled Rejection at: Promise ${p} reason: ${reason}`,
    "info"
  );
}
