"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.status(200).json({
        message: 'connect',
        service: 'backend is active',
        timestamp: new Date().toISOString(),
    });
});
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'backend',
        timestamp: new Date().toISOString(),
    });
});
app.use('/api/v0', routes_1.default);
/**
 * Global error handler (MUST be last)
 */
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map