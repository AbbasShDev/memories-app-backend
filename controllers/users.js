import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist." });

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword)
      return res.status(404).json({ message: "Invalid credentials." });

    const token = await jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.BCRYPT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Someting went wrong!." });
  }
};
export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User is already exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords does not match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });

    const token = await jwt.sign(
      { email: result.email, id: result._id },
      process.env.BCRYPT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Someting went wrong!." });
  }
};
