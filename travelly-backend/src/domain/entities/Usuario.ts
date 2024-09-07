export interface Usuario {
  id?: string; // UUID
  nome: string;
  email: string;
  senha: string;
  data_criacao?: Date;
}
