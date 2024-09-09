"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

interface Destino {
  id: string;
  nome: string;
  pais: string;
}

export default function CadastroAvaliacao() {
  const [nota, setNota] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const [destino, setDestino] = useState<Destino | null>(null);
  const router = useRouter();
  const params = useParams();
  const destino_id = params.destinoId;
  const usuario_id = "13cadb23-8f15-4bba-97ee-29464b1190c8"

  useEffect(() => {
    // Buscar os detalhes do destino com o ID da URL
    axios
      .get<Destino>(`http://localhost:8664/api/destino/get/${destino_id}`)
      .then((res) => setDestino(res.data))
      .catch((err) => console.error(err));
  }, [destino_id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const novaAvaliacao = {
      usuario_id,
      destino_id,
      nota,
      comentario,
    };

    axios
      .post("http://localhost:8664/api/avaliacao/create", novaAvaliacao)
      .then(() => {
        console.log("enviado", novaAvaliacao)
        router.push("/avaliacoes");  // Redireciona para a lista de avaliações
      })
      .catch((err) => console.error(err));
  };

  if (!destino) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="container">
      <h2>Avaliar Destino: {destino.nome}, {destino.pais}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nota:</label>
          <input
            type="number"
            value={nota}
            min={1}
            max={5}
            onChange={(e) => setNota(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Comentário:</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>
        <button type="submit">Enviar Avaliação</button>
      </form>
    </main>
  );
}
