"use client";
import Link from 'next/link';
import styles from '../../../styles/Cadastro.module.css';
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function FormUsuarios() {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const [nomeErro, setNomeErro] = useState<string | null>(null);
  const [emailErro, setEmailErro] = useState<string | null>(null);
  const [senhaErro, setSenhaErro] = useState<string | null>(null);

  const router = useRouter();

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
    } else if (senha.trim().length < 6) {
      setSenhaErro('A senha deve ter no mínimo 6 caracteres.');
      formValido = false;
    } else {
      setSenhaErro(null);
    }

    if (formValido) {
      axios.post<{ nome: string, email: string, senha: string }, void>(`http://localhost:8664/api/usuario/create`, {
        nome,
        email,
        senha
      })
        .then(() => {
          router.push("/usuarios/login");
        })
        .catch(() => {
          setEmailErro("Email inválido!");
        });
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
              <input className={styles.inputField} type="text" value={nome} onChange={(evt) => setNome(evt.target.value)} />
              {nomeErro && <small className={styles.error}>{nomeErro}</small>}
            </label>
            <label>
              E-mail:
              <input className={styles.inputField} type="email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
              {emailErro && <small className={styles.error}>{emailErro}</small>}
            </label>
            <label>
              Senha:
              <input className={styles.inputField} type="password" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
              {senhaErro && <small className={styles.error}>{senhaErro}</small>}
            </label>
          </fieldset>
          <button type="submit">Cadastrar</button>
          <Link href='/usuarios/login'>Já possui conta?</Link>
        </form>
      </main >
    </div>
  )
}