"use client";
import { useEffect, useState } from "react";
import {
  AvaliacaoCompleteData,
  AvaliacaoCompleteDataResponse,
} from "../interface"; // Defina sua interface Avaliacao corretamente
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowUpRightFromSquare,
  faUser,
  faPlane,
  faCalendar,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";

export function Estrelas({ nota }: { nota: number }) {
  return (
    <>
      {[...Array(nota)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} color="#FFD43B" />
      ))}
    </>
  );
}

export default function ListaAvaliacoes() {
  const [data, setData] = useState<AvaliacaoCompleteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<AvaliacaoCompleteDataResponse>(
        "http://localhost:8664/api/views/get-ratings-info"
      )
      .then((res) => {
        console.log(res.data.completeRatingsList);
        setData(res.data.completeRatingsList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <span aria-busy> Carregando avaliações...  </span>
      </div>
    );
  }
  return (
    <>
      <main className="container">
        <h2>
          <FontAwesomeIcon icon={faChartSimple} /> Avaliações
        </h2>
        <div className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th>
                  <FontAwesomeIcon icon={faUser} /> Usuário
                </th>
                <th>
                  <FontAwesomeIcon icon={faPlane} /> Destino
                </th>
                <th>
                  <FontAwesomeIcon icon={faStar} /> Nota
                </th>
                <th>
                  <FontAwesomeIcon icon={faCalendar} /> Data
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((avaliacao) => (
                <tr key={avaliacao.avaliacao_id}>
                  <td>{avaliacao.usuario_nome}</td>
                  <td>
                    {avaliacao.destino_nome}, {avaliacao.destino_pais}
                  </td>
                  <td>
                    <Estrelas nota={avaliacao.nota} />
                  </td>
                  <td>
                    {new Date(avaliacao.data_avaliacao).toLocaleDateString(
                      "pt-BR"
                    )}
                  </td>
                  <td>
                    <Link href={`/avaliacoes/${avaliacao.avaliacao_id}`}>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
