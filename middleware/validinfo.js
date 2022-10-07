const validifo = (req, res, next) => {
  const { email, name, password } = req.body;
  function validemail(useremail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail);
  }
  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("missing credentials");
    } else if (!validemail(email)) {
      return res.status(401).json("invalid email");
    }
  }
  if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("missing credentials");
    } else if (!validemail(email)) {
      return res.status(401).json("invalid email");
    }
  }
  next();
};

export default validifo;
