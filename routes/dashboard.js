import express from "express";
import pool from "../db.js";
import Authorization from "../middleware/authorization.js";
const router = express.Router();

router.get("/", Authorization, async (req, res) => {
  try {
    console.log(req.user);
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

export default router;
