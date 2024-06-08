"use strict";

import jwt from "jsonwebtoken";

import User from "../models/User.js";

const findOne = async (query) => {
  return await User.findOne(query).exec();
};

const find = async (query, selectables) => {
  return await User.find(query).select(selectables).exec();
};

const create = async (values) => {
  return await User.create(values);
};

const findOneAndUpdate = async (query, data) => {
  return await User.findOneAndUpdate(query, data, { new: true }).exec();
};

const remove = async (query) => {
  return await User.deleteOne(query).exec();
};

const update = async (query, values) => {
  return await User.updateMany(query, values).exec();
};

const count = async (query) => {
  return await User.countDocuments(query);
};
const generateToken = async (query) => {
  const token = await jwt.sign(
    { id: query._Id, role: query.role, email: query.email },
    "SecretKey",
    { expiresIn: "1h" }
  );
  return token;
};

export default {
  findOne,
  find,
  create,
  findOneAndUpdate,
  remove,
  update,
  count,
  generateToken,
};
