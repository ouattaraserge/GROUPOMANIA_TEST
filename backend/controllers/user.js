const express = require("express");
const models = require("../models");
const user = require("../models/user");


//Inscription utilisateur
exports.signup = (req, res, next) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          username: req.body.username,
          firstName: req.body.firstName,
          lastname = req.body.lastname,
          email: req.body.email,
          bio: req.body.bio,
          imageUrl: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null,
          password: hash,
          isAdmin: 0,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };
  
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: "24h" }),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
};
  
//Trouver tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    User.findAll()
      .then((users) => res.status(200).json({ users }))
      .catch((err) => res.status(401).json({ err }));
  };
  
  //trouver un utilsateur
  exports.getOneUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "password");
    const userId = decodedToken.userId;
    db.User.findOne({
      where: {
        id: userId,
      },
    })
      .then((user) => res.status(200).json({ user }))
      .catch((error) => res.status(404).json({ error }));
  };
  
  //Supprimer un utilisateur
  exports.deleteUser = (req, res, next) => {
    database.User.destroy({
      where: { id: req.params.id },
    })
      .then(() => res.status(200).json({ message: "utilisateur supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
};
  
//Mise à jour utilisateur
exports.modifyUser = (req, res, next) => {
    database.User.update(
      {
        pseudo: req.body.pseudo,
        email: req.body.email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((user) => res.status(201).json({ message: "Mise à jour effectuée !" }))
      .catch((error) => res.status(500).json(error));
  };
  