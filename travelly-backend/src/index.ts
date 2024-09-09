import { connectDB } from "./database/db";
import express from "express";
import { router } from "./routes/router";
import cors from "cors";

const PORT = 8664;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api", router);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("Servidor rodando na porta", PORT);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};

startServer();
