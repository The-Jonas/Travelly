export interface AvaliacoesCompleto {
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
}

export interface IViewsRepository {
  getAllRatings(): Promise<AvaliacoesCompleto[]>;
  getRatingById(id: string): Promise<AvaliacoesCompleto>;
}
