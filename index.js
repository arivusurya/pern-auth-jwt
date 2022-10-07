import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/jwtauth.js";
import dashboard from "./routes/dashboard.js";

dotenv.config();

const app = express();
// my own middleware
const reqmethod = (req, res, next) => {
  const reqmethod = req.method;
  const path = req.path;

  console.log(`${reqmethod} ${path} `);
  next();
};
//middleware
app.use(express.json());
app.use(cors());
app.use(reqmethod);

// routes
app.use("/auth", routes);
app.use("/dashboard", dashboard);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
