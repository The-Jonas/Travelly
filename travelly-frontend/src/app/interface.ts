export interface Avaliacao {
  id: string;
  usuario_id: string;
  destino_id: string;
  nota: number;
  comentario: string;
  data_avaliacao: Date;
};

export interface AvaliacaoCompleteData {
  avaliacao_id: string;
  usuario_id: string;
  usuario_nome: string;
  usuario_email: string;
  usuario_data_criacao: string;
  destino_id: string;
  destino_nome: string;
  destino_pais: string;
  destino_descricao: string;
  nota: number;
  comentario: string;
  data_avaliacao: Date;
};

export interface AvaliacaoCompleteDataResponse {
  completeRatingsList: AvaliacaoCompleteData[];
}

export interface DestinoData {
  id: string;
  nome: string;
  pais: string;
  descricao: string;
  imagem: Buffer;
};

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data_criacao: Date;
};

export interface UsuarioResponse {
  usersList: Usuario[];
};

export interface Pacote {
  id?: string; // UUID
  destino_id?: string; // UUID
  nome: string;
  descricao: string;
  preco_base: number;
}
