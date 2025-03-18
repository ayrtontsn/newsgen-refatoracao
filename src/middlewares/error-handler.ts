import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

type AppError = Error & {
  type: string
}

export default function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction) {

  console.log(error);

  const { name, message } = error;

  const statusHttp = {
    NotFound: httpStatus.NOT_FOUND,
    Conflict: httpStatus.CONFLICT,
    BadRequest: httpStatus.BAD_REQUEST,
    UnprocessableEntity: httpStatus.UNPROCESSABLE_ENTITY,
    Forbidden: httpStatus.FORBIDDEN,
  }

  if(statusHttp[name]){
    return res.status(statusHttp[name]).send(message)
  } else {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }

}