"use client";
import { MdEdit } from '@react-icons/all-files/md/MdEdit';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import { useEffect, useState } from 'react';

const SERVER = "http://localhost:8664";
const USERS_PATH = "/api/usuario/getAll";

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
    const fetchUsuarios = async () => {
      try {
        const apiUrl = `${SERVER}${USERS_PATH}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const usuarios = data.usersList.map((user: { data_criacao: string | number | Date; }) => ({
          ...user,
          dataCriacao: new Date(user.data_criacao),
        }));
  

        setUsuarios(usuarios);
      } catch (error) {
        console.error("Erro ao recuperar lista de usuarios:", error);
      }
    };

    fetchUsuarios();
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