import { Pool } from "pg";

const dbConnection = new Pool({
  user: process.env.DB_USER || "travelly",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "travelly",
  password: process.env.DB_PASSWORD || "travelly",
  port: Number(process.env.DB_PORT) || 5432,
});

export const connectDB = async () => {
  try {
    await dbConnection.connect();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};

export { dbConnection };
