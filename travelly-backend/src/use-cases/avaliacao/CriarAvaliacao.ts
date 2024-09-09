import {
  Avaliacao,
  IAvaliacaoRepository,
} from "../../domain/interfaces/IAvaliacaoRepository";

export class CriarAvaliacao {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async execute(avaliacao: Avaliacao): Promise<Avaliacao> {
    return await this.avaliacaoRepository.create(avaliacao);
  }
}
