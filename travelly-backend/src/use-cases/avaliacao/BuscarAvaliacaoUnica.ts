import { Avaliacao } from "../../domain/interfaces/IAvaliacaoRepository";
import { IAvaliacaoRepository } from "../../domain/interfaces/IAvaliacaoRepository";

export class BuscarAvaliacaoUnica {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async execute(id: string): Promise<Avaliacao | null> {
    return await this.avaliacaoRepository.getById(id);
  }
}
