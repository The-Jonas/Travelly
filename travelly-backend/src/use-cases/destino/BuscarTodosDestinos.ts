import { Destino } from "../../domain/interfaces/IDestinoRepository";
import { IDestinoRepository } from "../../domain/interfaces/IDestinoRepository";

export class BuscarTodosDestinos {
  constructor(private destinoRepository: IDestinoRepository) {}

  async execute(): Promise<Destino[]> {
    return await this.destinoRepository.getAll();
  }
}
