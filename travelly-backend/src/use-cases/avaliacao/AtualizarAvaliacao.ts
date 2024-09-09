import { Avaliacao } from "../../domain/interfaces/IAvaliacaoRepository";
import { IAvaliacaoRepository } from "../../domain/interfaces/IAvaliacaoRepository";

export class AtualizarAvaliacao {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async execute(id: string, avaliacao: Avaliacao): Promise<void> {
    return await this.avaliacaoRepository.update(id, avaliacao);
  }
}
