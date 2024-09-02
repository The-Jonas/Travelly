// src/app/page.tsx
import Link from 'next/link';
import styles from '../../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Bem-vindo ao Travelly</h1>
        <p>Encontre e personalize a viagem dos seus sonhos</p>
        <Link href="/usuarios/login" className={styles.btnPrimary}>Entrar</Link>
      </header>

      <main className={styles.main}>
        <section className={styles.features}>
          <h2>Por que escolher o Travelly?</h2>
          <div className={styles.featureItem}>
            <h3>Pacotes Personalizados</h3>
            <p>Crie o itinerário perfeito com base nas suas preferências.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Destinos Incríveis</h3>
            <p>Explore os destinos mais incríveis do mundo.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Ofertas Exclusivas</h3>
            <p>Aproveite ofertas e descontos exclusivos para nossos usuários.</p>
          </div>
        </section>
    
        <div className={styles.imageSection}></div>

        <section className={styles.callToAction}>
          <h2>Pronto para começar?</h2>
          <Link href="/usuarios/cadastro" className={styles.btnPrimary}>Crie sua conta</Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Travelly. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}