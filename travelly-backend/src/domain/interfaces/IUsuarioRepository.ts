export interface Usuario {
  id?: string; // UUID
  nome: string;
  email: string;
  senha: string;
  data_criacao?: Date;
}

export interface IUsuarioRepository {
  create(usuario: Usuario): Promise<Usuario>;
  getById(id: string): Promise<Usuario | null>;
  update(id: string, usuario: Usuario): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Usuario[]>;
}
