import { Router } from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import multer from "multer";
import { DestinoController } from "./controllers/DestinoController";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "image/jfif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido. Apenas imagens são permitidas."));
    }
  },
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post("/usuario/create", UsuarioController.createUser);
router.get("/usuario/get/:id", UsuarioController.getUser);
router.get("/usuario/getAll", UsuarioController.getAllUsers);
router.patch("/usuario/update", UsuarioController.updateUser);
router.delete("/usuario/delete", UsuarioController.deleteUser);

router.post(
  "/destino/create",
  upload.single("imagem"),
  DestinoController.createDestiny
);
router.get("/destino/get/:id", DestinoController.getDestiny);
router.get("/destino/getAll", DestinoController.getAllDestinies);
router.patch(
  "/destino/update",
  upload.single("imagem"),
  DestinoController.updateDestiny
);
router.delete("/destino/delete", DestinoController.deleteDestiny);

export { router };
