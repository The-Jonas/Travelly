"use client"
import { useEffect, useState } from "react"
import { Avaliacao } from "../interface"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowUpRightFromSquare, faUser, faPlane, faCalendar, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";

export function Estrelas({ nota }: { nota: number }) {
  return [...Array(nota)].map(() => < FontAwesomeIcon icon={faStar} color="#FFD43B" />)
}

export default function ListaAvaliacoes() {

  // const [data, setData] = useState<Avaliacao[]>([]);
  axios.get<any>('http://localhost:8664/avaliacao/getAll')
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

  // useEffect(() => {
  //   setData([
  //     {
  //       id: '1231-238384-3903783-29090',
  //       nota: 5,
  //       data_avaliacao: new Date(),
  //       comentario: "Incrível",
  //       destino: {
  //         id: "112-111-11231-50",
  //         nome: "Xique Xique",
  //         pais: "Brasil",
  //         descricao: "Xique-Xique na Bahia",
  //         imagem: ""
  //       },
  //       usuario: {
  //         id: "12312-2123-1123",
  //         nome: "Fulaninho da Silva",
  //         email: "fulaninho@example.com",
  //         senha: "12354",
  //         data_criacao: new Date()
  //       }
  //     }
  //   ])
  // }, [])

  return (
    <>
      <main className="container">
        <h2><FontAwesomeIcon icon={faChartSimple} /> Avaliações</h2>
        <div className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th><FontAwesomeIcon icon={faUser} /> Usuário</th>
                <th><FontAwesomeIcon icon={faPlane} /> Destino</th>
                <th><FontAwesomeIcon icon={faStar} /> Nota</th>
                <th><FontAwesomeIcon icon={faCalendar} /> Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map(avaliacao =>
                <tr>
                  <td>{avaliacao.usuario.nome}</td>
                  <td>{avaliacao.destino.nome}, {avaliacao.destino.pais}</td>
                  <td><Estrelas nota={avaliacao.nota} /></td>
                  <td>{avaliacao.data_avaliacao.toLocaleDateString('pt-BR')}</td>
                  <td><Link href="/avaliacoes/avaliacao"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link></td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )

}