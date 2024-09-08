import {
  IDestinoRepository,
  Destino,
} from "../../domain/interfaces/IDestinoRepository";
import { dbConnection } from "../db";
import { v4 as uuidv4 } from "uuid";

export class DestinoRepository implements IDestinoRepository {
  async create(destino: Destino): Promise<Destino> {
    destino.id = destino.id || uuidv4();
    const query =
      "INSERT INTO Destino (id, nome, descricao, pais, imagem) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      destino.id,
      destino.nome,
      destino.descricao,
      destino.pais,
      destino.imagem,
    ];
    const result = await dbConnection.query(query, values);
    return result.rows[0];
  }
  async getById(id: string): Promise<Destino | null> {
    const result = await dbConnection.query(
      "SELECT * FROM Destino WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }
  async update(id: string, destino: Destino): Promise<void> {
    const query = "UPDATE Destino SET descricao = $1 WHERE id = $2";
    const values = [destino.descricao, id];
    await dbConnection.query(query, values);
  }
  async delete(id: string): Promise<void> {
    await dbConnection.query("DELETE FROM Destino WHERE id = $1", [id]);
  }
  async getAll(): Promise<Destino[]> {
    const result = await dbConnection.query("SELECT * FROM Destino");
    return result.rows;
  }
}
