import { Usuario } from "../../domain/entities/Usuario";
import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository";

export class BuscarUsuarioUnico {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(id: string): Promise<Usuario | null> {
    return await this.usuarioRepository.getById(id);
  }
}
