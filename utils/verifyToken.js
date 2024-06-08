import jwt from "jsonwebtoken";

import { CustomError } from "./CustomError.js";
export const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  console.log("this is token", token);
  if (!token) return next(CustomError(401, "Unauthorized ..."));
  try {
    token = token.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    next(new Error(401, "Unauthorized ..."));
  }
};
