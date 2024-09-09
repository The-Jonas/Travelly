import { IDestinoRepository } from "../../domain/interfaces/IDestinoRepository";

export class DeletarDestino {
  constructor(private destinoRepository: IDestinoRepository) {}

  async execute(id: string): Promise<void> {
    const destinoExistente = await this.destinoRepository.getById(id);

    if (!destinoExistente) {
      throw new Error(`Destino com ID ${id} não encontrado.`);
    }

    return await this.destinoRepository.delete(id);
  }
}
