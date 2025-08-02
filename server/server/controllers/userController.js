import userModel from "../config/models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId, { "profilePic.data": 0 });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        username: user.username,
        isVerified: user.isVerified,
        email: user.email,
        id: user._id,
        profilePic: user.profilePic,
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
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const loggedInserId = req.userId;
    const usersData = await userModel.find(
      { _id: { $ne: loggedInserId } },
      { _id: 1, username: 1, isVerified: 1, profilePic: 1 }
    );

    const users = usersData.map((user) => {
      if (user.profilePic) {
        user.profilePic.data = "";
      }
      return user;
    });

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await userModel.findByIdAndUpdate(
      userId,
      { profilePic: image },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile pic updated successfully",
      image,
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error", error: err.message });
  }
};

export const getProfilePic = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user || !user.profilePic || !user.profilePic || !user.profilePic.data)
      return res.json("No image found");

    res.set("Content-Type", user.profilePic.contentType);
    res.send(user.profilePic.data);
  } catch (err) {
    res.status(500).send("Error loading image");
  }
};
