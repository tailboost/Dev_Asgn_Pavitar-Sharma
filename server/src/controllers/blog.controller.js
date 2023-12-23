import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import { generateUploadURL } from "../utils/aws.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

export const generateUploadBannerURL = asyncHandler(async (req, res) => {
  const uploadURL = await generateUploadURL(req.file);
  res.status(200).json({ uploadURL });
});

export const createBlog = async (req, res, next) => {
  const authorId = req.user;

  let { title, banner, des, country } = req.body;

  if (!title) {
    return next(
      createHttpError(400, "You must provide a title to publish the blog")
    );
  }

  if (!des.length) {
    return next(
      createHttpError(
        400,
        "You must provide blog description under 200 characters"
      )
    );
  }

  if (!banner) {
    return next(
      createHttpError(400, "You must provide blog banner to publish it")
    );
  }

  const blogData = {
    title,
    banner,
    des,
    country,
    author: authorId,
  };

  const blog = await Blog.create(blogData);

  await User.findOneAndUpdate(
    { _id: authorId },
    {
      $push: { blogs: blog._id },
    }
  );

  res.status(201).json(blog);
};

export const allLatestBlogs = async (req, res, next) => {
  const { country } = req.query;
  const blogs = await Blog.find({ country })
    .populate("author", "_id fullname email location")
    .sort({ createdAt: -1 });

  res.status(200).json(blogs);
};
