"use client";
import { Usuario, Destino } from "@/app/interface";
import { useState } from "react";
import styles from "./page.module.css";
import { Estrelas } from "../page";

interface Avaliacao {
  id: string;
  usuario: Usuario;
  destino: Destino;
  nota: number;
  comentario: string;
  data_avaliacao: Date;
}

export default function InfoAvaliacao() {
  const [data, setData] = useState<Avaliacao>({
    id: "1231-238384-3903783-29090",
    nota: 3,
    data_avaliacao: new Date(),
    comentario: "Incrível",
    destino: {
      id: "112-111-11231-50",
      nome: "Xique Xique",
      pais: "Brasil",
      descricao:
        "Xique-Xique é um município brasileiro do estado da Bahia, Região Nordeste do país. Está situado à margem direita do Rio São Francisco, que abriga um porto de grande importância para economia da região.",
      imagem: "",
    },
    usuario: {
      id: "12312-2123-1123",
      nome: "Fulaninho da Silva",
      email: "fulaninho@example.com",
      senha: "12354",
      data_criacao: new Date(),
    },
  });

  return (
    <>
      <main className="container">
        <article>
          <hgroup>
            <h5>{data.usuario.nome}</h5>
            <small style={{ fontSize: "0.7rem" }}>
              Membro desde {data.usuario.data_criacao.getFullYear()}
            </small>
          </hgroup>
          <hr />
          <div className="grid">
            <div>
              <p>
                <b>
                  {data.destino.nome}, {data.destino.pais} -{" "}
                  <Estrelas nota={data.nota} />
                </b>
              </p>
              <p className={styles.desc}>{data.destino.descricao}</p>
              <p>
                <b>Viaje para {data.destino.nome} com esses pacotes!</b>
              </p>
              <table className={`${styles.desc} overflow-auto`}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Preço Base</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nordeste</td>
                    <td>R$: 10000,00</td>
                  </tr>
                  <tr>
                    <td>Cidades do Brasil</td>
                    <td>R$: 5000,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <img
              src="https://cataas.com/cat"
              className={styles.imagemDestino}
            />
          </div>
        </article>
      </main>
    </>
  );
}
