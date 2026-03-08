"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configEnv = {
    node_env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3000", 10),
    postgress: process.env.DATABASE_URL,
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID || "",
    },
    jwt: {
        secret: process.env.JWT_SECRET ||
            "THIS_IS_THE_TOP_SECRET_KEY_DO_NOT_SHARE_TO_ANY",
        expiresIn: process.env.JWT_EXPIRESIN || "24h",
    },
};
//# sourceMappingURL=index.js.map