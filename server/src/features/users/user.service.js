import user from "./user.model";

const createUser = async (userObj) => {
  try {
    const newUser = await user.create(userObj);
    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchUserByEmail = async (emailId) => {
  try {
    return await user.findAll({
      where: { email_id: emailId },
    });
  } catch (error) {
    throw error;
  }
};

const userService = {
  createUser,
  fetchUserByEmail,
};
export default userService;
