/**
 * Classe para tratar erros de SQL.
 */
export class UnknownError {
  caller: string;
  object: any;
  timestamp: Date;

  constructor(caller: string, object: Object) {
    this.object = object;
    this.caller = caller;
    this.timestamp = new Date();
  }
}
