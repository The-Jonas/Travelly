import { Request, Response } from "express";
import { ViewsRepository } from "../../database/repositories/ViewsRepository";

const viewsRepository = new ViewsRepository();

export class ViewsController {
  static async getAllRatingsInfo(req: Request, res: Response) {
    try {
      const completeRatings = await viewsRepository.getAllRatings();
      return res.status(200).json({ completeRatingsList: completeRatings });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar dados da view.", error });
    }
  }
  static async getRatingInfo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const completeRatings = await viewsRepository.getRatingById(id);
      return res.status(200).json(completeRatings);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar dados da view.", error });
    }
  }
}
