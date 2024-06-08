"use strict";

import userService from "../Services/UserService.js";
import bcryptjs from "bcryptjs";
import { CustomError } from "../utils/CustomError.js";
import { CustomResponse } from "../utils/CusomResponse.js";

const getUserByEmail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findOne({ _id: id });
    if (!user) {
      return res.json(CustomResponse(404, "User not found", false));
    }
    res.json(CustomResponse(200, "User found ", true, user));
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    userData.password = await bcryptjs.hash(userData.password, 10);
    const newUser = await userService.create(userData);
    res.json(CustomResponse(201, "User created successfully", true, newUser));
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      CustomError(401, "You can only update your own account!", false)
    );
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await userService.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    const { password, ...rest } = updatedUser._doc;
    res.json(CustomResponse(200, "User updated successfully", rest));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    await userService.remove({ email: email });
    res.json(CustomResponse(200, "User deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export default {
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
