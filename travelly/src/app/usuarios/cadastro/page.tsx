"use client";
import Link from 'next/link';
import styles from '../../../styles/Cadastro.module.css'
import { useState } from "react";


export default function FormUsuarios() {

  const [nome, setNome] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(nome, email, senha);
  }

  return (
    <>
      <main className={styles.centered_container}>
        <h2 className={styles.centeredTitle}>Crie sua conta</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Nome:
              <input className={styles.inputField} type="text" value={nome} onChange={(evt) => setNome(evt.target.value)} />
            </label>
            <label>
              E-mail:
              <input className={styles.inputField} type="email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
            </label>
            <label>
              Senha:
              <input className={styles.inputField} type="password" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
            </label>
          </fieldset>
          <button type="submit">Cadastrar</button>
          <Link href='/usuarios/login'>Já possui conta?</Link>
        </form>
      </main >z
    </>
  )
}