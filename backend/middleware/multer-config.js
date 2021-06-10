const multer = require("multer");

const MIME_TYPES = {
  "image/gif": "gif",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "video/avi": "avi",
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
};

/* Indique la destination de l'image à enregistrer et spécifie le nom du fichier */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.split(" ").join("_").split(`.${extension}`).join("");
    callback(null, name + Date.now() + "." + extension);
  },
});

/* Filtre le format de l'image voulant être uploadée */
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/gif") {
    callback(null, true);
  } else {
    callback(new Error("le format de l'image n'est pas accepté"), false);
  }
};

/* Filtre le poids de l'image voulant être uploadée */
const fileSize = { fileSize: 1024 * 1024 * 5 }; //limite la taille de l'image à 5Mo

module.exports = multer({ storage: storage, fileFilter: fileFilter, limits: fileSize }).single("image");
