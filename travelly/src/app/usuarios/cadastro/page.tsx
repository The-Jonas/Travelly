"use client";
import Link from 'next/link';
import styles from '../../../styles/Cadastro.module.css';
import { useState } from "react";

export default function FormUsuarios() {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const [nomeErro, setNomeErro] = useState<string | null>(null);
  const [emailErro, setEmailErro] = useState<string | null>(null);
  const [senhaErro, setSenhaErro] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let formValido = true;

    if (nome.trim() === '') {
      setNomeErro('O nome é obrigatório.');
      formValido = false;
    } else {
      setNomeErro(null);
    }

    if (email.trim() === '') {
      setEmailErro('O e-mail é obrigatório.');
      formValido = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailErro('Por favor, insira um e-mail válido.');
      formValido = false;
    } else {
      setEmailErro(null);
    }

    if (senha.trim() === '') {
      setSenhaErro('A senha é obrigatória.');
      formValido = false;
    } else {
      setSenhaErro(null);
    }

    if (formValido) {
      console.log(nome, email, senha);
      // Aqui você pode enviar os dados do formulário para uma API, etc.
    }
  }

  return (
    <div>
      <main className={styles.centered_container}>
        <h2 className={styles.titleCustom}>Crie sua conta</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Nome:
              <input className={styles.inputField} type="text" value={nome} onChange={(evt) => setNome(evt.target.value)} /> {nomeErro && <span className={styles.error}>{nomeErro}</span>}
            </label>
            <label>
              E-mail:
              <input className={styles.inputField} type="email" value={email} onChange={(evt) => setEmail(evt.target.value)} /> {emailErro && <span className={styles.error}>{emailErro}</span>}
            </label>
            <label>
              Senha:
              <input className={styles.inputField} type="password" value={senha} onChange={(evt) => setSenha(evt.target.value)} /> {senhaErro && <span className={styles.error}>{senhaErro}</span>}
            </label>
          </fieldset>
          <button type="submit">Cadastrar</button>
          <Link href='/usuarios/login'>Já possui conta?</Link>
        </form>
      </main >z
    </div>
  )
}