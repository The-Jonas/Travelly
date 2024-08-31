"use client";

import { useState } from "react";

export default function FormUsuarios() {

  const [nome, setNome] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();

  return (
    <>
      <main className="centered container">
        <h1>Usuário</h1>
        <form>
          <fieldset>
            <label>
              Nome
              <input value={nome} onChange={(evt) => setNome(evt.target.value)} />
            </label>
            <label>
              E-mail
              <input value={email} onChange={(evt) => setEmail(evt.target.value)} />
            </label>
            <label>
              Senha
              <input type="password" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
            </label>
          </fieldset>
          <input type="button" value="Salvar" onClick={() => console.log(nome, email, senha)} />
        </form>
      </main >
    </>
  )
}