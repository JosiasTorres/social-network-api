import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialNetworkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("🟢 Conectado a MongoDB"));

// Configurar rutas
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});