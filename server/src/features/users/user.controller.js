import userService from "./user.service";

const createUser = async (req, res) => {
  try {
    const userObj = {
      email: req.body.email,
    };
    res.status(200).json({
      data: await userService.createUser(userObj),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const fetchUserByEmail = async (req, res) => {
  try {
    const emailId = req.params.emailId;
    res.status(200).json({
      data: await userService.fetchUserByEmail(emailId),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

const userController = {
  createUser,
  fetchUserByEmail,
};
export default userController;
