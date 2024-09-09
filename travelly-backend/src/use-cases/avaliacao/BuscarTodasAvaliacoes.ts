import { Avaliacao } from "../../domain/interfaces/IAvaliacaoRepository";
import { IAvaliacaoRepository } from "../../domain/interfaces/IAvaliacaoRepository";

export class BuscarTodasAvaliacoes {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async execute(): Promise<Avaliacao[]> {
    return await this.avaliacaoRepository.getAll();
  }
}
