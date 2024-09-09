"use client";
import Link from 'next/link';
import styles from '../../../styles/Cadastro.module.css'
import { useState } from "react";
import { Usuario, UsuarioResponse } from '@/app/interface';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function FormUsuarios() {

  const [email, setEmail] = useState<string>('');
  const [emailErro, setEmailErro] = useState<string | undefined>('');
  const [senha, setSenha] = useState<string>('');
  const [senhaErro, setSenhaErro] = useState<string | undefined>('');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.get<UsuarioResponse>("http://localhost:8664/api/usuario/getAll")
      .then((res) => {
        let usuarioEncontrado = false;
        res.data.usersList.forEach((usuario) => {
          if (usuario.email == email) {
            if (usuario.senha == senha) {
              usuarioEncontrado = true;
            }
            setSenhaErro('Senha inválida');
            return;
          }
        });

        if (usuarioEncontrado) {
          router.push("/avaliacoes");
          return;
        }
        setEmailErro("Usuário não encontrado!");
      })
      .catch((err) => {
        console.log(err);
        setEmailErro("Usuário não encontrado!");
      });
  }

  return (
    <div>
      <main className={styles.centered_container}>
        <h2 className={styles.titleCustom}>Entre em sua conta</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
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
          <button type="submit">Entrar</button>
          <label>
            Ainda não possui conta?&nbsp;
            <Link href='/usuarios/cadastro'>Registre-se</Link>
          </label>
        </form>
      </main >
    </div>
  )
}