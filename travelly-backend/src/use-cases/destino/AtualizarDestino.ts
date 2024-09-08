import { Destino } from "../../domain/interfaces/IDestinoRepository";
import { IDestinoRepository } from "../../domain/interfaces/IDestinoRepository";

export class AtualizarDestino {
  constructor(private destinoRepository: IDestinoRepository) {}

  async execute(id: string, destino: Destino): Promise<void> {
    return await this.destinoRepository.update(id, destino);
  }
}
