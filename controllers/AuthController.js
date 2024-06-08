import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { CustomError } from "../utils/CustomError.js";
import { CustomResponse } from "../utils/CusomResponse.js";

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(CustomError(404, "User not found!", false));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(CustomError(401, "Wrong credentials!", false));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    const newRest = { token: token, ...rest };
    res.json(CustomResponse(201, "User logged in successfully", true, newRest));
  } catch (error) {
    next(error);
  }
};
const signOut = async (req, res, next) => {
  try {
    // res.status(200).json("User has been logged out!");
    res.json(CustomResponse(200, "User has been logged out!", true));
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  const { lastname, firstname, email, password } = req.body;
  console.log(lastname, firstname, email, password);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    lastname,
    firstname,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json(CustomResponse(201, "User created successfully!", true));
  } catch (error) {
    next(error);
  }
};

export default {
  signin,
  signOut,
  signup,
};
