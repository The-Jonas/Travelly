export type Avaliacao = {
  id: string;
  usuario: Usuario;
  destino: Destino; 
  nota: number;
  data_avaliacao: Date;
}

export type Destino = {
  id: string;
  nome: string;
  pais: string;
  descricao: string;
  imagem: string;
}

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data_criacao: Date;
}

export type PacoteTuristico = {
  id: string;
  nome: string;
  preco_base: number;
  destino: Destino;
}