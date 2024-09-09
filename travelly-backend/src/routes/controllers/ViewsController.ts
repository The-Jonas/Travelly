import { Request, Response } from "express";
import { ViewsRepository } from "../../database/repositories/ViewsRepository";

const viewsRepository = new ViewsRepository();

export class ViewsController {
  static async getRatingsInfo(req: Request, res: Response) {
    try {
      const completeRatings = await viewsRepository.getAllRatings();
      return res.status(200).json({ completeRatingsList: completeRatings });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar dados da view.", error });
    }
  }
}
