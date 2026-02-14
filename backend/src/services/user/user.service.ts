import * as userModel from "../../models/user/user.model";
import { AppError } from "../../errors/appError";

/**
 * Get all users
 */
export const getAllUsers = async () => {
  return userModel.findAllUsers();
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string) => {
  const user = await userModel.findUserById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

/**
 * Create user
 */
export const createUser = async (data: {
  firebaseUid: string;
  name?: string;
  email?: string;
}) => {
  if (!data.name || !data.email) {
    throw new Error("Name and email are required");
  }

  return userModel.createUser({
    firebaseUid: data.firebaseUid,
    name: data.name,
    email: data.email,
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
  await getUserById(id); // ensures user exists
  return userModel.updateUser(id, data);
};

/**
 * Delete user
 */
export const deleteUser = async (id: string) => {
  await getUserById(id); // ensures user exists
  return userModel.deleteUser(id);
};
