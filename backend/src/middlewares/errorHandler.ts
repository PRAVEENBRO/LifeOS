import { Request, Response, NextFunction } from "express";
import {
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
  } from "@prisma/client/runtime/library";
import { AppError } from "../errors/appError";
import { configEnv } from "../shared";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  /**
   * Prisma errors
   */
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = `Duplicate value for field: ${err.meta?.target}`;
    }
  }

  if (err instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data provided";
  }

  /**
   * AppError (custom)
   */
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  /**
   * Log errors (keep simple for now)
   */
  if (configEnv.node_env !== "production") {
    console.error("❌ ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
