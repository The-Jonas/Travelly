"use client";
import { Pacote, AvaliacaoCompleteData, DestinoData } from "@/app/interface";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Estrelas } from "../page";
import axios from "axios";

export default function InfoAvaliacao({ params }: { params: { id: string } }) {
  const [data, setData] = useState<AvaliacaoCompleteData>();
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [imagemUrl, setImagemUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<AvaliacaoCompleteData>(`http://localhost:8664/api/views/get/${params.id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get<Pacote[]>(`http://localhost:8664/api/views/get-destiny-packs/${data?.destino_id}`)
      .then((res) => {
        setPacotes(res.data)
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get<DestinoData>(`http://localhost:8664/api/destino/get/${data?.destino_id}`)
      .then((res) => {
        console.log(res);
        const base64 = Buffer.from(res.data.imagem).toString("base64");
        setImagemUrl(base64);
      })
      .catch(err => {
        console.log(err);
      });
  }, [data]);

  if (loading) {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <span aria-busy> Carregando avaliação...  </span>
    </div>
  }

  if (data) {
    return (
      <>
        <main className="container">
          <article>
            <div>
              <small>
                <hgroup>
                  <p><b>{data.usuario_nome}</b></p>
                  <p style={{ fontSize: "0.7rem" }}>
                    Membro desde {data.usuario_data_criacao.split('-')[0]}
                  </p>
                </hgroup>
              </small>
              <Estrelas nota={data.nota} />
              <p>{data.comentario}</p>
            </div>
            <hr />
            <div className="grid">
              <div>
                <p>
                  <b>
                    {data.destino_nome}, {data.destino_pais}
                  </b>
                </p>
                <p className={styles.desc}>{data.destino_descricao}</p>
                <p>
                  <b>Viaje para {data.destino_nome} com esses pacotes!</b>
                </p>
                <table className={`${styles.desc} overflow-auto`}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Preço Base</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacotes.map(({ nome, preco_base }) =>
                      <tr key={nome}>
                        <td>{nome}</td>
                        <td>R$: {preco_base}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {imagemUrl && <img
                src={`data:image/jpg;base64,${imagemUrl}`}
                className={styles.imagemDestino}
              />}
            </div>
          </article>
        </main>
      </>
    );

  }

  return <p>Avaliação não encontrada :(</p>
}
