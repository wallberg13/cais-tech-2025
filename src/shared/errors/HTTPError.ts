export enum HttpCode {
  OK = 200,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ALLOWED = 405,
  PAYLOAD_TOO_LARGE = 413,
  IMATEAPOT = 418,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * Classe com o padrão básico de erro.
 */
export class HTTPError {
  message: string;
  details?: object;
  httpCode: number;
  timestamp: Date;

  constructor(message: string, httpCode: number, details?: Object) {
    this.message = message;
    this.details = details;
    this.httpCode = httpCode || 400;
    this.timestamp = new Date();
  }
}
