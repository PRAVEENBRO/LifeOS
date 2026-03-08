import { prisma } from "../../db/prisma";

/**
Get all users
 */
export const findAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Get user by ID
 */
export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const findUserByFirebaseUid = async (firebaseUid: string) => {
  return prisma.user.findFirst({
    where: { firebaseUid },
  });
};

/**
 * Create user
 */
export const createUser = async (data: {
  firebaseUid: string;
  name: string;
  email: string;
}) => {
  return prisma.user.create({
    data,
  });
};

/**
 * Update user
 */
export const updateUser = async (
  id: string,
  data: {
    name?: string;
    email?: string;
  }
) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Delete user
 */
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
