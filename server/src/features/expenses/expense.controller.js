import expense from "./expense.model";
import { v4 as uuidv4 } from "uuid";

const create = async function (req, res) {
  try {
    const expenseRes = await expense.create({
      id: uuidv4(),
      user_id: req.payload.id,
      paid_by: req.payload.email,
      type: req.body.type,
      category: req.body.category,
      title: req.body.title,
      amount: parseFloat(req.body.amount),
      desc: req.body.description,
      currency: "GBP",
      date: new Date(),
    });
    res.status(200).json({ data: expenseRes });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

const getAll = async function (req, res) {
  try {
    res.status(200).json({ data: await expense.findAll() });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const expenseController = {
  getAll,
  create,
};
export default expenseController;
