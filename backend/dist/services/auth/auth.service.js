"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithGoogle = void 0;
const jose_1 = require("jose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../../errors/appError");
const shared_1 = require("../../shared");
const userModel = __importStar(require("../../models/user/user.model"));
const firebaseJwks = (0, jose_1.createRemoteJWKSet)(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));
async function verifyFirebaseIdToken(idToken) {
    const projectId = shared_1.configEnv.firebase.projectId;
    if (!projectId) {
        throw new appError_1.AppError('Missing FIREBASE_PROJECT_ID in backend environment', 500);
    }
    try {
        const { payload } = await (0, jose_1.jwtVerify)(idToken, firebaseJwks, {
            issuer: `https://securetoken.google.com/${projectId}`,
            audience: projectId,
        });
        if (!payload.user_id || typeof payload.user_id !== 'string') {
            throw new appError_1.AppError('Invalid Firebase token payload', 401);
        }
        return {
            user_id: payload.user_id,
            email: typeof payload.email === 'string' ? payload.email : undefined,
            name: typeof payload.name === 'string' ? payload.name : undefined,
        };
    }
    catch {
        throw new appError_1.AppError('Invalid or expired Firebase token', 401);
    }
}
const loginWithGoogle = async (idToken) => {
    const decoded = await verifyFirebaseIdToken(idToken);
    const existingUser = await userModel.findUserByFirebaseUid(decoded.user_id);
    const user = existingUser
        ? await userModel.updateUser(existingUser.id, {
            email: decoded.email,
            name: decoded.name,
        })
        : await userModel.createUser({
            firebaseUid: decoded.user_id,
            email: decoded.email ?? '',
            name: decoded.name ?? 'Google User',
        });
    const accessToken = jsonwebtoken_1.default.sign({
        sub: user.id,
        email: user.email,
        firebaseUid: user.firebaseUid,
    }, shared_1.configEnv.jwt.secret, { expiresIn: shared_1.configEnv.jwt.expiresIn });
    return {
        accessToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            firebaseUid: user.firebaseUid,
        },
    };
};
exports.loginWithGoogle = loginWithGoogle;
//# sourceMappingURL=auth.service.js.map