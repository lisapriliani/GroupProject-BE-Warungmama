const jwt = require("jsonwebtoken");
const generateToken = (data) => {
  const token = jwt.sign({ data }, process.env.secretkey, {
    expiresIn: "1h",
  });
  return token;
};
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verify = jwt.verify(token.split(" ")[1], process.env.secretkey);
    if (verify) {
      next();
    }
  } catch (error) {
    return res.status(401).send({
      error: error,
    });
  }
};
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};
