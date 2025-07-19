import userModel from "../config/modals/userModel.js";



export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        username: user.username,
        isVerified: user.isVerified,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const deleteUser = await userModel.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};



