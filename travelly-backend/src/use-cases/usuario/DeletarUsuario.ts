import { IUsuarioRepository } from "../../domain/interfaces/IUsuarioRepository";

export class DeletarUsuario {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(id: string): Promise<void> {
    const usuarioExistente = await this.usuarioRepository.getById(id);

    if (!usuarioExistente) {
      throw new Error(`Usuário com ID ${id} não encontrado.`);
    }

    return await this.usuarioRepository.delete(id);
  }
}
