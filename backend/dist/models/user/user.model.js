"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUserByFirebaseUid = exports.findUserById = exports.findAllUsers = void 0;
const prisma_1 = require("../../db/prisma");
/**
Get all users
 */
const findAllUsers = async () => {
    return prisma_1.prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });
};
exports.findAllUsers = findAllUsers;
/**
 * Get user by ID
 */
const findUserById = async (id) => {
    return prisma_1.prisma.user.findUnique({
        where: { id },
    });
};
exports.findUserById = findUserById;
const findUserByFirebaseUid = async (firebaseUid) => {
    return prisma_1.prisma.user.findFirst({
        where: { firebaseUid },
    });
};
exports.findUserByFirebaseUid = findUserByFirebaseUid;
/**
 * Create user
 */
const createUser = async (data) => {
    return prisma_1.prisma.user.create({
        data,
    });
};
exports.createUser = createUser;
/**
 * Update user
 */
const updateUser = async (id, data) => {
    return prisma_1.prisma.user.update({
        where: { id },
        data,
    });
};
exports.updateUser = updateUser;
/**
 * Delete user
 */
const deleteUser = async (id) => {
    return prisma_1.prisma.user.delete({
        where: { id },
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.model.js.map