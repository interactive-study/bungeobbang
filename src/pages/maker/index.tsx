import Bungeo from '@/assets/Bungeo.png';
import { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css';

import head1 from '@/assets/temp/head1.png';
import head2 from '@/assets/temp/head2.png';
import head3 from '@/assets/temp/head3.png';
import head4 from '@/assets/temp/head4.png';

export default function BungeobbangMaker() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isStarted) {
        e.preventDefault();
        setIsStarted(true);
      }
    },
    [isStarted]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleStart);
    return () => {
      window.removeEventListener('keydown', handleStart);
    };
  }, [handleStart]);

  return (
    <main>
      <div className={styles.page}>
        <div className={styles.title}>
          <b className={styles.title__left}>나만의</b>
          <b className={styles.title__shadow}>나만의</b>
          <b className={styles.title__right}>붕어빵</b>
        </div>

        <div className={styles.frame}>
          <div className={styles.frame__upper}>
            <div
              className={`${styles.select} ${isStarted ? styles.fadeLeft : ''}`}
            >
            <div className={styles.select__option}>
              <img src={head1} alt="" />
            </div>
              <div className={styles.select__option}>
                <img src={head2} alt="" />
              </div>
              <div className={styles.select__option}>
                <img src={head3} alt="" />
              </div>
              <div className={styles.select__option}>
                <img src={head4} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.frame__lower} />
          {isStarted || (
            <div className={styles.frame__modal}>Press space to start</div>
          )}
        </div>

        <div className={styles.rail}>
          <div
            className={`${styles.rail__bungeo} ${isStarted ? styles.fadeLeft : ''}`}
          >
            <img className={styles.rail__bungeoImg} alt="" src={Bungeo} />
          </div>
        </div>
      </div>
    </main>
  );
}
