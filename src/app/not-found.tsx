import Link from "next/link";
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={`${styles.notFoundContainer} not-found-container`}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Страница не найдена</h2>
        <p className={styles.errorDescription}>
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/" className={styles.backButton}>
          <i className={`fas fa-arrow-left ${styles.backIcon}`}></i>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}