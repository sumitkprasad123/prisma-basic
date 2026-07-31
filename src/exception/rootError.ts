export class HttpException extends Error {
  message: string;
  status: number;
  response: any;

  constructor(message: string, status: number, response: any) {
    super(message);
    this.message = message;
    this.status = status;
    this.response = response;
  }
}
