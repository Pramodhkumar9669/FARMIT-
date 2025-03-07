import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authController = {
  async register(req, res) {
    try {
      let { firstName, lastName, email, password, role } = req.body;

      console.log("Received registration data:", req.body);

      if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }

      email = email.trim().toLowerCase();
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email,
        password: hashedPassword,
        role,
      });

      res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async login(req, res) {
    try {
      let { email, password } = req.body;

      console.log("Login attempt for:", email);

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      email = email.trim().toLowerCase();
      const user = await User.findOne({ email });

      if (!user) {
        console.log("Login failed: Invalid email or password");
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Login failed: Invalid email or password");
        return res.status(400).json({ message: "Invalid email or password" });
      }

      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return res.status(500).json({ message: "Server configuration error" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        user: { id: user._id, firstName: user.firstName, role: user.role },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

export default authController;
