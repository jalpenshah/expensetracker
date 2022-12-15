import categories from "./categories.model";

const getCategoriesForUser = async function (req, res) {
  try {
    const userId = req.params.userId;
    res.status(200).json({
      data: await categories.findAll({
        attributes: ["category"],
        where: { user_id: userId },
      }),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const categoriesController = {
  getCategoriesForUser,
};
export default categoriesController;
