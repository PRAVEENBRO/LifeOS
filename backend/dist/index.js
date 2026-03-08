"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const shared_1 = require("./shared");
const port = shared_1.configEnv.port || 3000;
const host = process.env.HOST || "0.0.0.0";
const startServer = () => {
    app_1.default.listen(port, host, () => {
        console.log(`Server running on http://${host}:${port}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map