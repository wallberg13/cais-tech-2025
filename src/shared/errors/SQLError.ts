/**
 * Classe para tratar erros de SQL.
 */
export class SQLError {
  code: string | undefined;
  message: string;
  caller: string;
  timestamp: Date;

  constructor(message: string, caller: string, code?: string) {
    this.caller = caller;
    this.code = code;
    this.message = message;
    this.timestamp = new Date();
  }
}
