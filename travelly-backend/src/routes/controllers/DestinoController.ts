import { Request, Response } from "express";
import { DestinoRepository } from "../../database/repositories/DestinoRepository";
import { Destino } from "../../domain/interfaces/IDestinoRepository";
import { CriarDestino } from "../../use-cases/destino/CriarDestino";
import { AtualizarDestino } from "../../use-cases/destino/AtualizarDestino";
import { BuscarDestinoUnico } from "../../use-cases/destino/BuscarDestinoUnico";
import { DeletarDestino } from "../../use-cases/destino/DeletarDestino";

const destinoRepository = new DestinoRepository();
const criarDestino = new CriarDestino(destinoRepository);
const atualizarDestino = new AtualizarDestino(destinoRepository);
const deletarDestino = new DeletarDestino(destinoRepository);
const buscarDestinoUnico = new BuscarDestinoUnico(destinoRepository);

export class DestinoController {
  static async createDestiny(req: Request, res: Response) {
    try {
      const { nome, descricao, pais } = req.body;
      const imagem = req.file?.buffer;

      if (!imagem) {
        return res.status(400).json({ message: "Nenhuma imagem enviada." });
      }

      const destinoRepository = new DestinoRepository();
      const destino = await destinoRepository.create({
        nome,
        descricao,
        pais,
        imagem,
      });

      return res.status(201).json(destino);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar destino", error });
    }
  }
  static async getDestiny(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const destino = await buscarDestinoUnico.execute(id);

      if (destino) {
        return res.status(200).json(destino);
      } else {
        return res.status(404).json({ message: "Destino não encontrado." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar destino.", error });
    }
  }
  static async getAllDestinies(req: Request, res: Response) {
    try {
      const destinos = await destinoRepository.getAll();
      return res.status(200).json({ destiniesList: destinos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar destinos.", error });
    }
  }
  static async updateDestiny(req: Request, res: Response) {
    const { id, nome, descricao, pais, imagem } = req.body;
    const destino: Destino = {
      nome,
      descricao,
      pais,
      imagem,
    };
    try {
      await atualizarDestino.execute(id, destino);
      return res
        .status(201)
        .json({ message: `Destino ${id} atualizado com sucesso!` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar destino", error });
    }
  }
  static async deleteDestiny(req: Request, res: Response) {
    const { id } = req.body;

    try {
      await deletarDestino.execute(id);
      return res
        .status(200)
        .json({ message: `Destino ${id} deletado com sucesso!` });
    } catch (error: any) {
      return res
        .status(error.message.includes("não encontrado") ? 404 : 500)
        .json({
          message: "Erro ao deletar destino.",
          error: error.message || error,
        });
    }
  }
}
