"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./page.module.css";


interface Destino {
  id: string;
  descricao: string;
  nome: string;
  pais: string;
  imagem?: string;
}

export default function ListaDestinos() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [imagens, setImagens] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    axios
      .get<Destino[]>("http://localhost:8664/api/destino/getAll")
      .then((res) => {
        setDestinos(res.data.destiniesList);
        console.log(res.data.destiniesList);

        res.data.destiniesList.forEach((destino: Destino) => {
          axios.get(`http://localhost:8664/api/destino/get/${destino.id}`)
            .then((res) => {
              console.log(res.data);
              const base64 = Buffer.from(res.data.imagem).toString("base64");
              setImagens(prev => ({
                ...prev,
                [destino.id]: `data:image/jpg;base64,${base64}`
              }));
            })
            .catch((err) => console.error(err));
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="container">
      <h2>Destinos</h2>
      <div className="overflow-auto">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Destino</th>
              <th>País</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {destinos.map((destino) => (
              <tr key={destino.id}>
                <td>
                  {destino.imagem ? (
                    <img
                      src={imagens[destino.id]}
                      alt={destino.nome}
                      className={styles.iconeDestino}
                    />
                  ) : (
                    <span>Imagem não disponível</span>
                  )}
                </td>
                <td>{destino.nome}</td>
                <td>{destino.pais}</td>
                <td>
                  <Link href={`/avaliacoes/cadastro/${destino.id}`}>
                    Avaliar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
