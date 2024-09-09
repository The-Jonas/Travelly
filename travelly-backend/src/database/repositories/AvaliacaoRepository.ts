import {
  IAvaliacaoRepository,
  Avaliacao,
} from "../../domain/interfaces/IAvaliacaoRepository";
import { dbConnection } from "../db";
import { v4 as uuidv4 } from "uuid";

export class AvaliacaoRepository implements IAvaliacaoRepository {
  async getById(id: string): Promise<Avaliacao | null> {
    const result = await dbConnection.query(
      "SELECT * FROM Avaliacao where id = $1",
      [id]
    );
    return result.rows[0] || null;
  }
  async update(id: string, avaliacao: Avaliacao): Promise<void> {
    const query =
      "UPDATE Avaliacao SET nota = $1, comentario = $2, data_avaliacao = $3 WHERE id = $4";
    const values = [avaliacao.nota, avaliacao.comentario, new Date(), id];
    await dbConnection.query(query, values);
  }
  async delete(id: string): Promise<void> {
    await dbConnection.query("DELETE FROM Avaliacao WHERE id = $1", [id]);
  }
  async getAll(): Promise<Avaliacao[]> {
    const result = await dbConnection.query("SELECT * FROM Avaliacao");
    return result.rows || null;
  }
  async create(avaliacao: Avaliacao): Promise<Avaliacao> {
    avaliacao.id = uuidv4();

    const query =
      "INSERT INTO Avaliacao (id, usuario_id, destino_id, nota, comentario, data_avaliacao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    const values = [
      avaliacao.id,
      avaliacao.usuario_id,
      avaliacao.destino_id,
      avaliacao.nota,
      avaliacao.comentario,
      new Date(),
    ];
    const result = await dbConnection.query(query, values);
    return result.rows[0];
  }
}
