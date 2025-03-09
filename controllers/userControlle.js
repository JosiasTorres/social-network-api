import User from "../models/User.js";
import Thought from "../models/Thought.js";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("friends").populate("thoughts");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("friends")
      .populate("thoughts");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Eliminar usuario y sus pensamientos
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // BONUS: Eliminar los pensamientos asociados al usuario
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: "Usuario y pensamientos eliminados" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Agregar amigo
export const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Eliminar amigo
export const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};