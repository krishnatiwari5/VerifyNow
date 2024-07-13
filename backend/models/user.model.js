import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userFirstName: {
      type: String,
      required: [true, "Please Enter Your First Name"],
    },

    userLastName: {
      type: String,
      required: [true, "Please Enter Your Last Name"],
    },

    userEmail: {
      type: String,
      required: [true, "Please Enter Your Email id"],
      unique: [true, "Email Id already exit"],
      lowercase: true,
      trim: true,
    },

    userPassword: {
      type: String,
      required: [true, "Please enter your password"],
    },
    userType: {
      type: String,
      default: "user",
      lowercase: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    verifyToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
