import styles from './styles.module.css';
import Bungeo from '@/assets/Bungeo.png';

export default function BungeobbangMaker() {
  return (
    <main>
      <div className={styles.page}>
        <div className={styles.title}>
          <b className={styles.title__left}>나만의</b>
          <b className={styles.title__shadow}>나만의</b>
          <b className={styles.title__right}>붕어빵</b>
        </div>

        <div className={styles.frame}>
          <div className={styles.frame__upper} />
          <div className={styles.frame__lower} />
          <div className={styles.frame__modal}>
            Press space to start
          </div>
        </div>

        <div className={styles.rail}>
          <div className={styles.rail__bungeo}>
            <img className={styles.rail__bungeoImg} alt="" src={Bungeo} />
          </div>
        </div>
      </div>
    </main>
  );
}
