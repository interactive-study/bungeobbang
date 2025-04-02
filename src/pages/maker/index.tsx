import Bungeo from '@/assets/Bungeo.png';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

import head1 from '@/assets/temp/head1.png';
import head2 from '@/assets/temp/head2.png';
import head3 from '@/assets/temp/head3.png';
import head4 from '@/assets/temp/head4.png';
import SelectGoButton from '@/assets/SelectGoButton.png';
import SelectStopButton from '@/assets/SelectStopButton.png';
import Fork from '@/assets/Fork.png';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

async function delay(seconds: number) {
  return gsap.delayedCall(seconds, () => {});
}

export default function BungeobbangMaker() {
  const [isStarted, setIsStarted] = useState(false);
  const [isGoing, setIsGoing] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const forkRef = useRef<HTMLImageElement>(null);
  const forkTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (isGoing && selectRef.current) {
      const widthOfSelect = selectRef.current.offsetWidth;
      forkTween.current = gsap.fromTo(
        `.${styles.fork}`,
        {
          left: '50px',
        },
        {
          left: `${widthOfSelect - 50}px`,
          repeat: -1,
          duration: 3,
          ease: 'power1.inOut',
          yoyo: true,
        }
      );
    }
  }, [isGoing]);

  const findNearestOption = useCallback(() => {
    if (selectRef.current && forkRef.current) {
      const selectOptions = Array.from(selectRef.current.children);
      const forkBounds = forkRef.current.getBoundingClientRect();
      const forkPosition = forkBounds.left + forkBounds.width / 2;
      const nearestOption = selectOptions.reduce<[number, Element]>(
        ([prevDistance, prevOption], option) => {
          const optionBounds = option.getBoundingClientRect();
          const currPosition = optionBounds.left + optionBounds.width / 2;
          const currDistance = Math.abs(currPosition - forkPosition);
          return currDistance < prevDistance
            ? [currDistance, option]
            : [prevDistance, prevOption];
        },
        [Infinity, selectOptions[0]]
      );
      return nearestOption[1];
    }
    throw new Error('SelectRef or ForkRef is not defined');
  }, []);

  const handleKeyboard = useCallback(
    async (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (!isStarted) {
          e.preventDefault();
          setIsStarted(true);
          setTimeout(() => {
            setIsGoing(true);
          }, 1000);
        } else if (isGoing) {
          e.preventDefault();
          setIsGoing(false);
          if (forkTween.current) {
            forkTween.current.kill();
          }
          const nearestOption = findNearestOption() as HTMLDivElement;
          nearestOption.style.background = 'red';
          await delay(0.5);
          await gsap.timeline().to(`.${styles.fork}`, {
            left: '50px',
            ease: 'linear',
            duration: 0.5,
          });
          await delay(0.5);
          setIsGoing(true);
        }
      }
    },
    [findNearestOption, isGoing, isStarted]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <main>
      <div className={styles.page}>
        <div className={styles.title}>
          <b className={styles.title__left}>나만의</b>
          <b className={styles.title__shadow}>나만의</b>
          <b className={styles.title__right}>붕어빵</b>
        </div>

        <div className={styles.frame}>
          {isStarted && (
            <>
              <img className={styles.fork} src={Fork} ref={forkRef} />
              {isGoing ? (
                <img className={styles.button} src={SelectGoButton} />
              ) : (
                <img className={styles.button} src={SelectStopButton} />
              )}
            </>
          )}
          <div className={styles.frame__upper}>
            <div
              className={`${styles.select} ${isStarted ? styles.fadeLeft : ''}`}
              ref={selectRef}
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
