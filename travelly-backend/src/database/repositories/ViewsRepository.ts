import {
  AvaliacoesCompleto,
  IViewsRepository,
} from "../../domain/interfaces/IViewsRepository";
import { dbConnection } from "../db";

export class ViewsRepository implements IViewsRepository {
  async getAllRatings(): Promise<AvaliacoesCompleto[]> {
    const result = await dbConnection.query(
      "SELECT * FROM avaliacoes_completas"
    );
    return result.rows || null;
  }
}
