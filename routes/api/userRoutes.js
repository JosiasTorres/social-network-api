import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController.js";

const router = express.Router();

// Rutas de usuarios
router.route("/")
  .get(getUsers)       // Obtener todos los usuarios
  .post(createUser);   // Crear usuario

router.route("/:userId")
  .get(getUserById)    // Obtener un usuario por ID
  .put(updateUser)     // Actualizar usuario
  .delete(deleteUser); // Eliminar usuario

// Rutas de amigos
router.route("/:userId/friends/:friendId")
  .post(addFriend)     // Agregar amigo
  .delete(removeFriend); // Eliminar amigo

export default router;