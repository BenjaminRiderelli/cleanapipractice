import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
type UserType = {
  name: { type: String };
  email: { type: String };
  password: { type: String };
};

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

// //esta funcion se ejecuta "antes" de guardar cualquier usuario en Mongo
userSchema.pre("save", function (next) {
  const user = this;
  
  // Check if user.password is defined and a string
  if (!user.isModified("password") || typeof user.password !== "string") {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password!, salt, function (err, hash) {
      if (err) return next(err);
      // Update user.password with the hashed value
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password:string) {
  return bcrypt.compareSync(password, this.password);
};

// * Method to generate the JWT (You choose the name)
userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    name: this.firstName,
    email: this.email,
  };
  // * This method is from the json-web-token library (who is in charge to generate the JWT
  return jwt.sign(payload, secret, {
    expiresIn:expirationDate.getTime() / 1000, 10 });
};

export const User = model("User", userSchema);
