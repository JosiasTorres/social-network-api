import express from "express";
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thoughtController.js";

const router = express.Router();

// Rutas de pensamientos
router.route("/")
  .get(getThoughts)       // Obtener todos los pensamientos
  .post(createThought);   // Crear un pensamiento

router.route("/:thoughtId")
  .get(getThoughtById)    // Obtener un pensamiento por ID
  .put(updateThought)     // Actualizar pensamiento
  .delete(deleteThought); // Eliminar pensamiento

// Rutas de reacciones
router.route("/:thoughtId/reactions")
  .post(addReaction);     // Agregar reacción

router.route("/:thoughtId/reactions/:reactionId")
  .delete(removeReaction); // Eliminar reacción

export default router;