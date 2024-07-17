const UserModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      return res.json({
        success: false,
        message: "Name, Email, Phone Number and Password are required fields.",
      });
    }
    const userObject = {
      email: email,
      name: name,
      password: password,
      phoneNumber: phoneNumber,
    };
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already Exist",
      });
    }

    await UserModel.create({ ...userObject });
    res.status(200).json({
      success: true,
      message: "User Registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and Password are required fields.",
      });
    }
    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      const isPasswordTrue = bcrypt.compareSync(password, user.password);
      if (!isPasswordTrue) {
        return res.status(401).json({
          success: false,
          message: "UserName or password is incorrect",
        });
      }

      const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 100000;
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        exp: expiryDateTime,
      };
      let token;
      if (user.token) {
        try {
          const data = jwt.verify(user.token, process.env.JWT_SECRET_KEY);
          if (data) {
            return res.status(400).json({
              success: false,
              message: "First log out please",
            });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      }
      await UserModel.findByIdAndUpdate(user.id, { $set: { token: token } });
      res.json({
        success: true,
        message: "User logged in successfully",
        userName: user.name,
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

const logoutUser = async (req, res)=>{
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.token) {
      res.status(400).json({
        success: false,
        message: "User already logged out",
      });
    }
    await UserModel.findByIdAndUpdate(req.user.id, {
      token: null,
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
