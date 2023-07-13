import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password, isCheck } = req.body;

  if (!name || !email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all values" });
    throw new BadRequestError("Fields cannot be blank.");
  }

  if (!isCheck) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please agree to our Terms of Service and Privacy Policy.",
    });
    throw new BadRequestError(
      "Please agree to our Terms of Service and Privacy Policy."
    );
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email is already in use" });
    throw new BadRequestError("Email is already in use");
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      uid: token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all values" });
    throw new BadRequestError("Please provide all values");
  }

  let user = await User.findOne({ email }).select("+password"); //override 'select: false' defined on password prop UserSchema
  const isPasswordCorrect = await user.comparePassword(password);
  if (!user || !isPasswordCorrect) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Invalid email or password.",
    });
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  // user.password = undefined; //remove password from the user object response
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      uid: token,
    },
  });
};

export { register, login };
