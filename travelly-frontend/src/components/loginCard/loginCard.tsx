import styles from './loginCard.module.css'

type LoginCardProps = {
    title: string;
    children: React.ReactNode;
}


export default function LoginCard({ title, children }: LoginCardProps) { 
    return(
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            {children}
        </div>
    )
}