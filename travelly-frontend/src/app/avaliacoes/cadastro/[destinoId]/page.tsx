"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from './CadastroAvaliacao.module.css'; // Importação do CSS

interface Destino {
  id: string;
  nome: string;
  pais: string;
  imagem: string; // Campo para armazenar a imagem em base64
}


const InteractiveStarRating = ({ rating, onRatingChange }: { rating: number, onRatingChange: (star: number) => void }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon 
            icon={faStar} 
            color={(hover !== null ? star <= hover : star <= rating) ? "#FFD43B" : "#e4e5e9"}
          />
        </span>
      ))}
    </div>
  );
};

export default function CadastroAvaliacao() {
  const [nota, setNota] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");
  const [destino, setDestino] = useState<Destino | null>(null);
  const router = useRouter();
  const params = useParams();
  const destino_id = params.destinoId;

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const usuario_id = usuario.id;

  useEffect(() => {
    // Buscar os detalhes do destino com o ID da URL
    axios
      .get<Destino>(`http://localhost:8664/api/destino/get/${destino_id}`)
      .then((res) => setDestino(res.data))
      .catch((err) => console.error(err));
  }, [destino_id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .post("http://localhost:8664/api/avaliacao/create", { usuario_id, destino_id, nota, comentario })
      .then(() => {
        router.push("/avaliacoes");
      })
      .catch((err) => console.error(err));
  };

  if (!destino) {
    return <p>Carregando...</p>;
  }

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Avaliar Destino: {destino.nome}, {destino.pais}</h2>
      <div className={styles.formContainer}>
        <div className={styles.imageSection}>
          {destino.imagem && (
            <img
              src={`data:image/jpg;base64,${Buffer.from(destino.imagem).toString("base64")}`}
              alt={destino.nome}
              className={styles.destinoImagem}
            />
          )}
        </div>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label>Nota:</label>
                <InteractiveStarRating rating={nota} onRatingChange={setNota} />
            </div>
            <div className={styles.formGroup}>
              <label>Comentário:</label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>
            <button type="submit">Enviar Avaliação</button>
          </form>
        </div>
      </div>
    </main>
  );
}