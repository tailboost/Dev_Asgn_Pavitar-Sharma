import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogs: {
      type: [Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },

    location: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

// Hash Password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
userSchema.methods.comparePassword = async function (eneteredPassword) {
  return await bcrypt.compare(eneteredPassword, this.password);
};

const User = model("User", userSchema);

export default User;
