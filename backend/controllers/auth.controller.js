import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, name });
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({message: error.message});
  }
};

export const login = (req, res) => {
  res.send("login up route called");
};

export const logout = (req, res) => {
  res.send("logout up route called");
};