import express from "express";
import userController from "./user.controller";

const userRouter = express.Router();

userRouter.get("/createUser", userController.createUser);
userRouter.get("/:emailId", userController.fetchUserByEmail);

export default userRouter;
