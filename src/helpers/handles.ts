import { DatabaseError } from "pg";
import { UnknownError } from "@errors/UnknownError";
import { SQLError } from "@errors/SQLError";
import { ExecutionError } from "@errors/ExecutionError";
import serverConfig from "@constants/serverConfig";
import { HTTPError } from "@errors/HTTPError";
import {
  ERROR_TO_CLIENT,
  GetMessage,
  UNKNOWN_ERROR,
} from "@constants/messages";

/**
 * Função para obter a mensagem e a pilha de execução que provou um erro de execução
 * no software.
 * @param caller
 * @param err
 * @returns
 */
function HandleExecutionError(caller: string, err: Error): undefined {
  if (!err.stack) {
    return;
  }

  const stack = err.stack.split("\n");
  const message = stack.shift() || "Unknown Message";

  while (stack.length) {
    if (stack[stack.length - 1].match(serverConfig.main)) {
      break;
    }

    stack.pop();
  }

  const newStack = stack.map((o) => o.trim().replace(/^at /, ""));

  throw new ExecutionError(caller, message, newStack);
}

export function ErrorHandle(err: any, caller: string, object: any) {
  if (err instanceof DatabaseError) {
    throw new SQLError(err.message, caller, err.code);
  } else {
    HandleExecutionError(caller, err);

    throw new UnknownError(caller, object);
  }
}

export function TransformToHTTPError(err: any, lang: string): HTTPError {
  if (err instanceof SQLError) {
    return new HTTPError(GetMessage(ERROR_TO_CLIENT, lang), 500);
  } else {
    return new HTTPError(GetMessage(UNKNOWN_ERROR, lang), 500);
  }
}
