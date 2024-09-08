import { Destino } from "../../domain/interfaces/IDestinoRepository";
import { IDestinoRepository } from "../../domain/interfaces/IDestinoRepository";

export class BuscarDestinoUnico {
  constructor(private destinoRepository: IDestinoRepository) {}

  async execute(id: string): Promise<Destino | null> {
    return await this.destinoRepository.getById(id);
  }
}
