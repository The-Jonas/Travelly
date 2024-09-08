import { IAvaliacaoRepository } from "../../domain/interfaces/IAvaliacaoRepository";

export class DeletarAvaliacao {
  constructor(private avaliacaoRepository: IAvaliacaoRepository) {}

  async execute(id: string): Promise<void> {
    const avaliacaoExistente = await this.avaliacaoRepository.getById(id);

    if (!avaliacaoExistente) {
      throw new Error(`Avalição com ID ${id} não encontrada.`);
    }

    return await this.avaliacaoRepository.delete(id);
  }
}
