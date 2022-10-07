import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwtgenerator from "../utils/jwtgenerator.js";
import validifo from "../middleware/validinfo.js";
import Authorization from "../middleware/authorization.js";

const router = express.Router();

// register
router.post("/register", validifo, async (req, res) => {
  try {
    // destructure the req body
    const { name, email, password } = req.body;
    // check if user exist (if exist then return user alreay exist)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length != 0) {
      return res.status(401).json("user already exists");
    }
    // bcrypt the user password
    const saltround = 10;
    const salt = await bcrypt.genSalt(saltround);

    const hashedpassword = await bcrypt.hash(password, salt);
    // enter the user into database;
    const newuser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, hashedpassword]
    );

    // generating out jwt token
    const token = jwtgenerator(newuser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});
// LOGIN  //
router.post("/login", validifo, async (req, res) => {
  try {
    // destructure the data
    const { email, password } = req.body;
    // check if user exist
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("email or password is incorret");
    }
    const validpassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validpassword) {
      return res.status(401).json("email or password is incorrect");
    }

    // jwt token;
    const token = jwtgenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/is-verify", Authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

export default router;
