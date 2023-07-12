import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true, //define unique index, not validator
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
      maxlength: 20,
      select: false, //exclude password to be accessible by default -  User.findOne({username: this.username}).select('password').exec(function (err, user)
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  //console.log(this.modifiedPaths() will return array of modified keys
  //if updateUser() -> pre save middleware should not run
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  //using mongoDB ._id as userID
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME, // the exp field should be expressed in seconds or a string describing a time span zeit/ms (e.g: 60, "2 days", "10h", "7d" )
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
