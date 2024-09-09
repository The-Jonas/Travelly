export type Avaliacao = {
  id: string;
  usuario_id: string;
  destino_id: string;
  nota: number;
  comentario: string;
  data_avaliacao: Date;
};

export type AvaliacaoCompleteData = {
  avaliacao_id?: string;
  usuario_id?: string;
  usuario_nome?: string;
  usuario_email?: string;
  usuario_data_criacao?: Date;
  destino_id?: string;
  destino_nome?: string;
  destino_pais?: string;
  destino_descricao?: string;
  nota: number;
  comentario: string;
  data_avaliacao: Date;
};

export interface AvaliacaoCompleteDataResponse {
  completeRatingsList: AvaliacaoCompleteData[];
}

export type Destino = {
  id: string;
  nome: string;
  pais: string;
  descricao: string;
  imagem: string;
};

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data_criacao: Date;
};

export type PacoteTuristico = {
  id: string;
  nome: string;
  preco_base: number;
  destino: Destino;
};
