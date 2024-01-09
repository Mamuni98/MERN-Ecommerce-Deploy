const model = require("../model/user");
const fs = require("fs");
const User = model.User;
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

//SIGNUP
exports.signUp = (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const hash = bcrypt.hashSync(req.body.password, 10);
  user.token = token;
  user.password = hash;
  user
    .save()
    .then((doc) => {
      console.log({ doc });
      res.status(201).json({ token });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//LOGIN
exports.logIn = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      await doc.save();
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
