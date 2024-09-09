import { Usuario } from "../../domain/interfaces/IUsuarioRepository";
import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository";

export class CriarUsuario {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioRepository.create(usuario);
  }
}
