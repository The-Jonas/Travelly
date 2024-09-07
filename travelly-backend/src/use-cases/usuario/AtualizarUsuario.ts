import { Usuario } from "../../domain/interfaces/IUsuarioRepository";
import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository";

export class AtualizarUsuario {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(id: string, usuario: Usuario): Promise<void> {
    return await this.usuarioRepository.update(id, usuario);
  }
}
