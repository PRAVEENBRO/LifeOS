import { Request, Response } from "express";
import * as userService from "../../services/user/user.service";

/**
 * GET /users
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

/**
 * GET /users/:id
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * POST /users
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * PUT /users/:id
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await userService.updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE /users/:id
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await userService.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
