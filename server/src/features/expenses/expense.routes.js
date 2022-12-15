import express from "express";
import expenseController from "./expense.controller";

const expenseRouter = express.Router();

expenseRouter.get("/list", expenseController.getAll);
expenseRouter.post("/create", expenseController.create);

export default expenseRouter;
