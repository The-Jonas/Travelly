import { Request, Response } from "express";
import { PacoteRepository } from "../../database/repositories/PacotesRepository";

const pacoteRepository = new PacoteRepository();

export class PacoteController {
  static async getPackageInfo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const packageInfo = await pacoteRepository.getByDestinyId(id);
      return res.status(200).json(packageInfo);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar pacotes para o destino.", error });
    }
  }
}
