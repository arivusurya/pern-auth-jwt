import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const Authorization = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(403).json("Not Authorized");
    }
    const payload = await jwt.verify(token, process.env.jwtsecret);
    req.user = payload.user;
  } catch (error) {
    res.status(505).json(error.message);
  }
  next();
};

export default Authorization;
