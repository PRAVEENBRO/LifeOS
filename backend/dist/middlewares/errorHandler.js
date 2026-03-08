"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const library_1 = require("@prisma/client/runtime/library");
const appError_1 = require("../errors/appError");
const shared_1 = require("../shared");
const errorHandler = (err, _req, res, _next) => {
    // Default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    /**
     * Prisma errors
     */
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 409;
            message = `Duplicate value for field: ${err.meta?.target}`;
        }
    }
    if (err instanceof library_1.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid data provided";
    }
    /**
     * AppError (custom)
     */
    if (err instanceof appError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    /**
     * Log errors (keep simple for now)
     */
    if (shared_1.configEnv.node_env !== "production") {
        console.error("❌ ERROR:", err);
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map