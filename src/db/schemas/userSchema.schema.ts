import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET ?? "";
const issuer = process.env.JWT_ISSUER ?? "";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): boolean;
  generateJWT(): string;
}

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password") || typeof user.password !== "string") {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password!, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    name: this.firstName,
    email: this.email,
  };
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    issuer: issuer,
  });
};

export const User = model<UserDocument>("User", userSchema);
