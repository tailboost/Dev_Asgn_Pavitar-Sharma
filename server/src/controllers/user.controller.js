import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import User from "../models/user.model.js";
import { generateSignature } from "../utils/jwt.js";

export const formatDatatoSend = async (user, access_token) => {
  return {
    access_token,
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    location: user.location,
    blogs: user.blogs,
  };
};

export const signup = asyncHandler(async (req, res, next) => {
  const { fullname, email, password, location } = req.body;

  if (!fullname)
    return next(createHttpError(400, "Please add your full name."));
  if (!email) return next(createHttpError(400, "Please add your email."));
  if (!password) return next(createHttpError(400, "Please add your password."));

  const user = await User.create({
    fullname,
    email,
    password,
    location,
  });

  const access_token = await generateSignature(user);
  const response = await formatDatatoSend(user, access_token);

  res.status(201).json(response);
});

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  if (!email) return next(createHttpError(400, "Please add your email."));
  if (!password) return next(createHttpError(400, "Please add your password."));

  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(404, "Invalid credentials"));
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return next(createHttpError(400, "Invalid credentials"));
  }

  const access_token = await generateSignature(user);
  const response = await formatDatatoSend(user, access_token);

  res.status(200).json(response);
});

export const profile = asyncHandler(async (req, res, next) => {});
