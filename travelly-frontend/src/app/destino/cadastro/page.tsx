"use client"

import { ChangeEvent, useState } from "react"

export default function CadastroDestino() {

  const [pais, setPais] = useState<string>();
  const [nome, setNome] = useState<string>();
  const [descricao, setDescricao] = useState<string>();
  const [imagem, setImagem] = useState<File>();
  const [urlImagem, setUrlImagem] = useState<string>('');
  const [pacote, setPacote] = useState<any>(); // TODO: criar pacoteTuristico

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      setImagem(files[0]);
      setUrlImagem(URL.createObjectURL(files[0]))
    }
  }

  return (
    <>
      <main className="centered container">
        <h2>Destino</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="grid">
            <label>
              Nome:
              <input type="text" value={nome} onChange={(evt) => setNome(evt.target.value)} />
            </label>
            <label>
              País:
              <input type="text" value={pais} onChange={(evt) => setPais(evt.target.value)} />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Descrição:
              <textarea style={{ resize: "none" }} value={descricao} onChange={(evt) => setDescricao(evt.target.value)} />
            </label>
            <label>
              Imagem:
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              <img src={urlImagem} alt={nome} style={{
                width: '100%',
                aspectRatio: 'calc(16/9)',
                border: "0.0625rem solid #cfd5e2",
                borderRadius: "var(--pico-border-radius)",
              }} />
            </label>
          </fieldset>
          <button type="submit">Salvar</button>
        </form >
      </main >
    </>
  )
}