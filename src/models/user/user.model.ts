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
export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Create user
 */
export const createUser = async (data: {
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
  id: number,
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
export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};
