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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const userModel = __importStar(require("../../models/user/user.model"));
const appError_1 = require("../../errors/appError");
/**
 * Get all users
 */
const getAllUsers = async () => {
    return userModel.findAllUsers();
};
exports.getAllUsers = getAllUsers;
/**
 * Get user by ID
 */
const getUserById = async (id) => {
    const user = await userModel.findUserById(id);
    if (!user) {
        throw new appError_1.AppError("User not found", 404);
    }
    return user;
};
exports.getUserById = getUserById;
/**
 * Create user
 */
const createUser = async (data) => {
    if (!data.name || !data.email) {
        throw new Error("Name and email are required");
    }
    return userModel.createUser({
        firebaseUid: data.firebaseUid,
        name: data.name,
        email: data.email,
    });
};
exports.createUser = createUser;
/**
 * Update user
 */
const updateUser = async (id, data) => {
    await (0, exports.getUserById)(id); // ensures user exists
    return userModel.updateUser(id, data);
};
exports.updateUser = updateUser;
/**
 * Delete user
 */
const deleteUser = async (id) => {
    await (0, exports.getUserById)(id); // ensures user exists
    return userModel.deleteUser(id);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map