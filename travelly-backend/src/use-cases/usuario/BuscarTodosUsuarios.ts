import { Usuario } from "../../domain/interfaces/IUsuarioRepository";
import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository";

export class BuscarUsuarioUnico {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(): Promise<Usuario[]> {
    return await this.usuarioRepository.getAll();
  }
}
