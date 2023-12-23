import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
    },
    des: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    country: String,
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);

export default Blog;
