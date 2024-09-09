import {
  Destino,
  IDestinoRepository,
} from "../../domain/interfaces/IDestinoRepository";

export class CriarDestino {
  constructor(private destinoRepository: IDestinoRepository) {}

  async execute(destino: Destino): Promise<Destino> {
    return await this.destinoRepository.create(destino);
  }
}
