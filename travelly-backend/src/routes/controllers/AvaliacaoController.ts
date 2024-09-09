import { Request, Response } from "express";
import { CriarAvaliacao } from "../../use-cases/avaliacao/CriarAvaliacao";
import { AtualizarAvaliacao } from "../../use-cases/avaliacao/AtualizarAvaliacao";
import { AvaliacaoRepository } from "../../database/repositories/AvaliacaoRepository";
import { Avaliacao } from "../../domain/interfaces/IAvaliacaoRepository";
import { DeletarAvaliacao } from "../../use-cases/avaliacao/DeletarAvaliacao";
import { BuscarAvaliacaoUnica } from "../../use-cases/avaliacao/BuscarAvaliacaoUnica";

const avaliacaoRepository = new AvaliacaoRepository();
const criarAvaliacao = new CriarAvaliacao(avaliacaoRepository);
const atualizarAvaliacao = new AtualizarAvaliacao(avaliacaoRepository);
const deletarAvaliacao = new DeletarAvaliacao(avaliacaoRepository);
const buscarAvaliacaoUnica = new BuscarAvaliacaoUnica(avaliacaoRepository);

export class AvaliacaoController {
  static async createAvaliacao(req: Request, res: Response) {
    const { usuario_id, destino_id, nota, comentario } = req.body;
    const avaliacao: Avaliacao = {
      usuario_id,
      destino_id,
      nota,
      comentario,
    };
    try {
      const novaAvaliacao = await criarAvaliacao.execute(avaliacao);
      return res
        .status(201)
        .json({ message: "Avaliacao criada com sucesso!", novaAvaliacao });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao criar avaliação", error });
    }
  }
  static async getAvaliacao(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const avaliacao = await buscarAvaliacaoUnica.execute(id);

      if (avaliacao) {
        return res.status(200).json(avaliacao);
      } else {
        return res.status(404).json({ message: "Avaliação não encontrada." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar avaliação.", error });
    }
  }
  static async getAllAvaliacoes(req: Request, res: Response) {
    try {
      const avaliacoes = await avaliacaoRepository.getAll();
      return res.status(200).json({ avaliacoesList: avaliacoes });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar avaliações.", error });
    }
  }
  static async updateAvaliacao(req: Request, res: Response) {
    const { id, nota, comentario, data_avaliacao } = req.body;
    const avaliacao: Avaliacao = {
      nota,
      comentario,
      data_avaliacao,
    };
    try {
      await atualizarAvaliacao.execute(id, avaliacao);
      return res
        .status(201)
        .json({ message: `Avaliação ${id} atualizada com sucesso!` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar avaliação", error });
    }
  }
  static async deleteAvaliacao(req: Request, res: Response) {
    const { id } = req.body;

    try {
      await deletarAvaliacao.execute(id);
      return res
        .status(200)
        .json({ message: `Avaliação ${id} deletada com sucesso!` });
    } catch (error: any) {
      return res
        .status(error.message.includes("não encontrado") ? 404 : 500)
        .json({
          message: "Erro ao deletar avaliação",
          error: error.message || error,
        });
    }
  }

}
