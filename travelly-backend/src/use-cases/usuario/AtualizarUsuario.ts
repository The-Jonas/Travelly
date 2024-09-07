import { Usuario } from "../../domain/entities/Usuario";
import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository";

export class AtualizarUsuario {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(id: string, usuario: Usuario): Promise<void> {
    return await this.usuarioRepository.update(id, usuario);
  }
}
