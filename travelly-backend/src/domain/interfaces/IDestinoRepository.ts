export interface Destino {
  id?: string; // UUID
  nome: string;
  pais: string;
  descricao: string;
  imagem?: Buffer;
}

export interface IDestinoRepository {
  create(destino: Destino): Promise<Destino>;
  getById(id: string): Promise<Destino | null>;
  update(id: string, Destino: Destino): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Destino[]>;
}
