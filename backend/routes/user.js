const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

//Users routes
// Créer un nouvel utilisateur
router.post("/register", users.create);

//Connexion utilisateurs
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", auth, userCtrl.modifyUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);

module.exports = router;
