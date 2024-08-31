"use client";
import { MdEdit } from '@react-icons/all-files/md/MdEdit';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import { useEffect, useState } from 'react';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  dataCriacao: Date;
  senha?: string;
}

export default function ListaUsuarios() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    setUsuarios([
      { id: 1, nome: 'Paulo Maciel', email: 'paulomacieltorresfilho@gmail.com', dataCriacao: new Date() },
      { id: 2, nome: 'Teste teste', email: 'teste@gmail.com', dataCriacao: new Date() },
      { id: 3, nome: 'Masjkn Kknels', email: 'alksn@gmail.com', dataCriacao: new Date() }
    ])
  }, [])

  return (
    <>
      <main className="container">
        <h1>Usuários</h1>
        <article className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Data criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(({ id, nome, email, dataCriacao }) =>
                <tr key={id}>
                  <td>{id}</td>
                  <td>{nome}</td>
                  <td>{email}</td>
                  <td>{dataCriacao.toISOString()}</td>
                  <td className="table-icons">
                    <a href="/"><MdEdit className="icon" /></a>
                    <a href="/"><MdDelete className="icon" /></a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
      </main>
    </>
  )
}