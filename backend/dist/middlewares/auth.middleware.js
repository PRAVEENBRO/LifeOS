"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../errors/appError");
const shared_1 = require("../shared");
const requireAuth = (req, _res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) {
        return next(new appError_1.AppError('Missing bearer token', 401));
    }
    const token = authorization.replace('Bearer ', '').trim();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, shared_1.configEnv.jwt.secret);
        req.auth = {
            userId: decoded.sub,
            email: decoded.email,
            firebaseUid: decoded.firebaseUid,
        };
        return next();
    }
    catch {
        return next(new appError_1.AppError('Invalid token', 401));
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.middleware.js.map