export interface Avaliacao {
  id?: string;
  usuario_id?: string;
  destino_id?: string;
  nota: Number;
  comentario: string;
  data_avaliacao?: Date;
}

export interface IAvaliacaoRepository {
  create(avaliacao: Avaliacao): Promise<Avaliacao>;
  getById(id: string): Promise<Avaliacao | null>;
  update(id: string, Avaliacao: Avaliacao): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Avaliacao[]>;
}
