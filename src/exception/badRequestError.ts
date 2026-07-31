import { HttpException } from "./rootError";

export class BadRequestError extends HttpException {
  constructor(message: string, status: number) {
    super(message, status, null);
  }
}
