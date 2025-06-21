import { HTTPError } from "@errors/HTTPError";
import { Log } from "@helpers/Log";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export function Validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedOutput = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      Object.assign(req, parsedOutput);

      next();
    } catch (error: any) {
      const errorMessage =
        error instanceof ZodError
          ? error.flatten().fieldErrors
          : error.toString();

      Log(`Validate.${req.url}`, errorMessage, "error", error);

      if (error instanceof ZodError) {
        res.status(422).json({
          message: "Validation failed",
          errors: errorMessage,
        });

        return;
      }

      throw new HTTPError("Internal Server Error", 500);
    }
  };
}
