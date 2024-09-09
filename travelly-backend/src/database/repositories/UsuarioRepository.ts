import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository";
import { Usuario } from "../../domain/interfaces/IUsuarioRepository";
import { dbConnection } from "../db";
import { v4 as uuidv4 } from "uuid";

export class UsuarioRepository implements IUsuarioRepository {
  async create(usuario: Usuario): Promise<Usuario> {
    usuario.id = usuario.id || uuidv4();
    const query =
      "INSERT INTO Usuario (id, nome, email, senha, data_criacao) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      usuario.id,
      usuario.nome,
      usuario.email,
      usuario.senha,
      new Date(),
    ];
    const result = await dbConnection.query(query, values);
    return result.rows[0];
  }

  async getById(id: string): Promise<Usuario | null> {
    const result = await dbConnection.query(
      "SELECT * FROM Usuario WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: string, usuario: Usuario): Promise<void> {
    const query =
      "UPDATE Usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4";
    const values = [usuario.nome, usuario.email, usuario.senha, id];
    await dbConnection.query(query, values);
  }

  async delete(id: string): Promise<void> {
    await dbConnection.query("DELETE FROM Usuario WHERE id = $1", [id]);
  }

  async getAll(): Promise<Usuario[]> {
    const result = await dbConnection.query("SELECT * FROM Usuario");
    return result.rows || null;
  }
}
