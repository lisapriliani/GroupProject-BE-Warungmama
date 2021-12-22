const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const { secretkey } = process.env;
const generateToken = (data) => {
  const token = jwt.sign({ data }, secretkey, {
    expiresIn: "1h",
  });
  return token;
};
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const id = req.params.id;
    const verify = jwt.verify(token.split(" ")[1], secretkey);
    if (verify) {
      next();
    }
  } catch (error) {
    return res.status(401).send({
      error: error,
    });
  }
};
const dataToken = (req, res) => {
  try {
    const token = req.headers.authorization;
    const verify = jwt.verify(token.split(" ")[1], secretkey);
    return verify;
  } catch (error) {
    console.log("invalid token");
  }
};
const verifyTokenWithId = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const id = req.params.id;
    const verify = jwt.verify(token.split(" ")[1], secretkey);
    if (verify.data._id === id) {
      next();
    } else {
      res.status(404).send("forbidden");
    }
  } catch (error) {
    return res.status(404).send({
      error: error,
    });
  }
};
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
  verifyTokenWithId: verifyTokenWithId,
  dataToken: dataToken,
};
