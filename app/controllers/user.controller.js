const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.users;

// Create and Save a user
exports.signUp = (req, res) => {
  // Validate request
  if (!req.body.email && !req.body.password) {
    res
      .status(400)
      .send({ message: "Please provide email and password to continue." });
    return;
  }

  const email = req.body.email;

  const filter = { email: email };

  //Find user based on the email provided in API req
  User.findOne(filter, (err, user) => {
    if (err || user === null) {
      //If not found
      // Create a User
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: email,
        password: req.body.password,
        role: req.body.role ? req.body.role : "user",
        isLoggedIn: true,
      });

      // Save User in the database
      user
        .save(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred, please try again later.",
          });
        });
    } else {
      //User found with same email
      res.status(400).send({
        message: "User Already Exists.",
      });
    }
  });
};

// Retrieve user using the email provided in the req parameter.
// Validate user by matching the password provided in the req parameter.
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Validate request
  if (!email && !password) {
    res
      .status(400)
      .send({ message: "Please provide email and password to continue." });
    return;
  }

  const filter = { email: email };
  User.findOne(filter, (err, user) => {
    if (err || user === null) {
      res.status(401).send({
        //better message wrt security. Prevents brute force attacks
        message: "Email or password is not correct.",
      });
    } else {
      if (password === user.password) {
        user.isLoggedIn = true;

        User.findOneAndUpdate(filter, user, { useFindAndModify: false })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: "Some error occurred, please try again later.",
              });
            } else {
              const token = jwt.sign({ _id: data._id }, "myprivatekey");
              data.token = token;
              res.send(data);
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating.",
            });
          });
      } else {
        res.status(401).send({
          message: "Email or password is not correct.",
        });
      }
    }
  });
};

// Update isLoggedIn parameter of a User.
exports.logout = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({ message: "Please provide User Id." });
    return;
  }

  const id = req.body.id;
  const update = { isLoggedIn: false };

  User.findByIdAndUpdate(id, update)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Some error occurred, please try again later.",
        });
      } else res.send({ message: "Logged Out successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating.",
      });
    });
};