import express from "express";
import {
  createBlog,
  generateUploadBannerURL,
  allLatestBlogs,
} from "../controllers/blog.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();

router.get("/latest-blogs", allLatestBlogs);

router.post(
  "/get-upload-url",
  upload.single("banner"),
  generateUploadBannerURL
);

router.post("/create-blog", isAuthenticated, createBlog);

export default router;
