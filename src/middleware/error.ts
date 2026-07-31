import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception/rootError";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status).send({
    message: error.message,
    status: error.status,
    response: error.response,
  });
};
