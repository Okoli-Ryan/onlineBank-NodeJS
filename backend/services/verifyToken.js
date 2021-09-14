const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).send({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
