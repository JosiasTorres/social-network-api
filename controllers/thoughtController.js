import Thought from "../models/Thought.js";
import User from "../models/User.js";

// Obtener todos los pensamientos
export const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Obtener un pensamiento por ID
export const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Pensamiento no encontrado" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Crear un nuevo pensamiento y asociarlo a un usuario
export const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    // Asociar el pensamiento al usuario
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: newThought._id },
    });

    res.json(newThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Actualizar pensamiento
export const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedThought) {
      return res.status(404).json({ message: "Pensamiento no encontrado" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Eliminar pensamiento
export const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Pensamiento no encontrado" });
    }

    res.json({ message: "Pensamiento eliminado" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Agregar reacción a un pensamiento
export const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "Pensamiento no encontrado" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Eliminar reacción de un pensamiento
export const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "Pensamiento no encontrado" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};