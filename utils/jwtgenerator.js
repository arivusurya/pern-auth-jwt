import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function jwtgenerator(user_id) {
  const payload = {
    user: user_id,
  };
  return jwt.sign(payload, process.env.jwtsecret, { expiresIn: "1hr" });
}

export default jwtgenerator;
