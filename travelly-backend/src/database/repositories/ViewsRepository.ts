import {
  AvaliacoesCompleto,
  IViewsRepository,
} from "../../domain/interfaces/IViewsRepository";
import { dbConnection } from "../db";

export class ViewsRepository implements IViewsRepository {
  async getRatingById(id: string): Promise<AvaliacoesCompleto> {
    const result = await dbConnection.query(
      "SELECT * FROM avaliacoes_completas where avaliacao_id = $1",
      [id]
    );
    return result.rows[0] || null;
  }
  async getAllRatings(): Promise<AvaliacoesCompleto[]> {
    const result = await dbConnection.query(
      "SELECT * FROM avaliacoes_completas"
    );
    return result.rows || null;
  }
}
