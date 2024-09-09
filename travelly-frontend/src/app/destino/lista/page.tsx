"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Destino {
  id: string;
  descricao: string;
  nome: string;
  pais: string;
}

export default function ListaDestinos() {
  const [destinos, setDestinos] = useState<Destino[]>([]);

  useEffect(() => {
    // Chama a API para obter a lista de destinos
    axios
      .get<Destino[]>("http://localhost:8664/api/destino/getAll")  // Exemplo de rota da API
      .then((res) => setDestinos(res.data.destiniesList))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="container">
      <h2>Destinos</h2>
      <div className="overflow-auto">
        <table>
          <thead>
            <tr>
              <th>Destino</th>
              <th>País</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {destinos.map((destino) => (
              <tr key={destino.id}>
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
