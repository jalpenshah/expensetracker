import express from "express";
import categoriesController from "./categories.controller";

const categoriesRouter = express.Router();

categoriesRouter.get("/:userId", categoriesController.getCategoriesForUser);

export default categoriesRouter;
