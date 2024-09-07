import { Router } from "express";
import { UsuarioController } from "./controllers/UsuarioController";

const router = Router();

router.post("/usuario/create", UsuarioController.createUser);
router.post("/usuario/update", UsuarioController.updateUser);
router.delete("/usuario/delete", UsuarioController.deleteUser);
router.get("/usuario/get/:id", UsuarioController.getUser);
router.get("/usuario/getAll", UsuarioController.getAllUsers);

export { router };
