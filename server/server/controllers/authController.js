import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../config/modals/userModel.js";
import transporter from "../config/nodemailer.js";


export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
         secure: true, // Only send over HTTPS
         sameSite: "None", // "None" required for cross-origin cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
        },
      });

    //sending welcome email

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: newUser.email,
      subject: "Welcome to Our Service",
      text: `Hello ${newUser.username},\n\nThank you for registering! We're glad to have you on board.\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "Lax",
         secure: true, // Only send over HTTPS
  sameSite: "None", // "None" required for cross-origin cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ email: user.email, username: user.username });

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
       secure: true, // Only send over HTTPS
  sameSite: "None", // "None" required for cross-origin cookies
    });

    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await userModel.findById(userId);

    if (user.isVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    user.verifyOtp = otp;
    user.verifyOtpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: user.email,
      subject: "Verify Your Account",
      text: `Your verification code is ${user.verifyOtp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const userId = req.userId;
  const otp = req.body.otp;

  console.log(otp);
  console.log(userId);

  if (!userId || !otp) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }
  if (otp.length !== 6) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid OTP format" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpires < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpires = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Account verified successfully",
      isVerified: user.isVerified,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid user" });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ sucess: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// SEND PASSWORD RESET OTP

export const sendResetOtp = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000)); // Generate a 6-digit OTP

    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `hey ${user.username}Your OTP code for resetting your Password is ${otp}.Use this OTP to proceed with resetting your password. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: " Password Reset OTP sent successfully, now get back to login",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Verify Reset OTP and Reset password

export const resetPassword = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  const newpassword = req.body.newpassword;

  if (!email || !otp || !newpassword) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }


  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpires < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedNewPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedNewPassword;
    user.resetOtp = "";
    user.resetOtpExpires = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


