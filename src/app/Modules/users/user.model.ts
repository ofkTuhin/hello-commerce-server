import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IUserMethod, UserModel, UserSchema } from "./user.interface";

const userSchema = new Schema<UserSchema, UserModel, IUserMethod>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    stripe_customer_id: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.methods.isUserExist = async function (
  id: string,
): Promise<Pick<UserSchema, "id" | "password" | "email"> | null> {
  return await User.findOne({ email: id }, { id: 1, password: 1, email: 1 });
};

// is user exist
userSchema.methods.isPasswordExist = async function (
  givenPassword: string,
  savedPassword: string,
) {
  return bcrypt.compare(givenPassword, savedPassword);
};

// compare password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

export const User = model<UserSchema, UserModel>("User", userSchema);
