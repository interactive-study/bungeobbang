import styles from './styles.module.css';
import Bungeo from '@/assets/Bungeo.png';

export default function BungeobbangMaker() {
  return (
    <div className={styles.page}>
      <img className={styles.child} alt="" src="Rectangle 3.svg" />
      <img className={styles.item} alt="" src="Rectangle 4.svg" />
      <div className={styles.inner} />
      <img className={styles.rectangleIcon} alt="" src="Rectangle 5.svg" />
      {/* <img className={styles.subtractIcon} alt="" src="Subtract.svg" /> */}
      <div className={styles.title}>
        <b className={styles.title__left}>나만의</b>
        <b className={styles.title__shadow}>나만의</b>
        <b className={styles.title__right}>붕어빵</b>
      </div>
      <div className={styles.frame}>
        <div className={styles.frame__upper}></div>
        <div className={styles.frame__lower}></div>
      </div>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img className={styles.x1Icon} alt="" src={Bungeo} />
      </div>
    </div>
  );
}
