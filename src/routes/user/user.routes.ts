import { Router } from "express";
import * as userController from "../../controllers/user/user.controller";

const userRouter = Router();

// GET /users
userRouter.get("/get_users_list", userController.getAllUsers);

userRouter.get("/get_user_details/:id", userController.getUserById);

userRouter.post("/create_new_user", userController.createUser);

userRouter.put("/update_user/:id", userController.updateUser);

userRouter.delete("delete_user/:id", userController.deleteUser);

export default userRouter;
