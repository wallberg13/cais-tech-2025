/**
 * Classe para tratar erros de SQL.
 */
export class ExecutionError {
  caller: string;
  message: string;
  stack: string[];
  timestamp: Date;

  constructor(caller: string, message: string, stack: string[]) {
    this.message = message;
    this.caller = caller;
    this.stack = stack;
    this.timestamp = new Date();
  }
}
