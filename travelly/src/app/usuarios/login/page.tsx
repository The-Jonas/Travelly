"use client";
import Link from 'next/link';
import styles from '../../../styles/Cadastro.module.css'
import { useState } from "react";


export default function FormUsuarios() {

  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, senha);
  }

  return (
    <>
      <main className={styles.centered_container}>
        <h2 className={styles.centeredTitle}>Entre em sua conta</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              E-mail:
              <input className={styles.inputField} type="email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
            </label>
            <label>
              Senha:
              <input className={styles.inputField} type="password" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
            </label>
          </fieldset>
          <button type="submit">Entrar</button> 
          <Link href='/usuarios/cadastro'>Ainda não possui conta?</Link>
        </form>
      </main >
    </>
  )
}