import Bungeo from '@/assets/Bungeo.png';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import * as Tone from 'tone';

import head1 from '@/assets/temp/head1.png';
import head2 from '@/assets/temp/head2.png';
import head3 from '@/assets/temp/head3.png';
import head4 from '@/assets/temp/head4.png';
import body1 from '@/assets/temp/body1.png';
import body2 from '@/assets/temp/body2.png';
import body3 from '@/assets/temp/body3.png';
import body4 from '@/assets/temp/body4.png';
import fin1 from '@/assets/temp/fin1.png';
import fin2 from '@/assets/temp/fin2.png';
import fin3 from '@/assets/temp/fin3.png';
import fin4 from '@/assets/temp/fin4.png';
import tail1 from '@/assets/temp/tail1.png';
import tail2 from '@/assets/temp/tail2.png';
import tail3 from '@/assets/temp/tail3.png';
import tail4 from '@/assets/temp/tail4.png';
import SelectGoButton from '@/assets/SelectGoButton.png';
import SelectStopButton from '@/assets/SelectStopButton.png';
import Fork from '@/assets/Fork.png';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { InfringementContext } from '@/contexts/InfringementContext';

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
  const bungeoParts = [
    [head1, head2, head3, head4],
    [body1, body2, body3, body4],
    [fin1, fin2, fin3, fin4],
    [tail1, tail2, tail3, tail4],
  ];
  const [selectedBungeoParts, setSelectedBungeoParts] = useState([
    '',
    '',
    '',
    '',
  ]);
  const [stage, setStage] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  /**
   * ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution
   */
  const { infringe } = useContext(InfringementContext);
  /**
   * ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution
   */

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
          Tone.start();
          const synth = new Tone.Synth().toDestination();
          synth.triggerAttackRelease('C4', '8n');
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
          const synth = new Tone.Synth().toDestination();
          const noteMap = ['C4', 'D4', 'F4', 'G4'];
          const note = noteMap[stage] ?? 'C4';
          synth.triggerAttackRelease(note, '8n');
          setSelectedBungeoParts((prev) => {
            const newParts = [...prev];
            newParts[stage] = nearestOption.querySelector('img')!.src;
            return newParts;
          });
          nearestOption.style.background = 'red';

          await delay(0.5);
          if (stage < 3) {
            setStage((prev) => prev + 1);
            await gsap.timeline().to(`.${styles.fork}`, {
              left: '50px',
              ease: 'linear',
              duration: 0.5,
            });
            await delay(0.5);
            setIsGoing(true);
          } else {
            setTimeout(() => {
              setIsFinished(true);
              const synth = new Tone.PolySynth().toDestination();
              synth.triggerAttackRelease(['C4', 'F#4', 'B4'], '2n');
            }, 500);
          }
        }
      }
    },
    [findNearestOption, isGoing, isStarted, stage]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [handleKeyboard]);

  useEffect(() => {
    if (isFinished) {
      infringe(selectedBungeoParts as [string, string, string, string]);
    }
  }, [isFinished, selectedBungeoParts]);

  return (
    <main>
      <div className={`${styles.page} ${isFinished && styles.page__finished}`}>
        {isFinished && <div className={styles.finished}>INFRINGEMENT</div>}
        {!isFinished && (
          <>
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
                  {bungeoParts[stage].map((part) => (
                    <div className={styles.select__option} key={part}>
                      <img src={part} alt="" />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.frame__lower} />
              {isStarted || (
                <div className={styles.frame__modal}>Press space to start</div>
              )}
            </div>
          </>
        )}

        <div className={styles.rail}>
          <div
            className={`${styles.rail__bungeo} ${isStarted ? styles.fadeLeft : ''}`}
          >
            <img className={styles.rail__bungeoImg} alt="" src={Bungeo} />
          </div>
          {selectedBungeoParts.map((part, index) => {
            if (part === '') return null;
            return (
              <img
                key={part}
                className={`${styles.rail__part} ${styles[`rail__part${index + 1}`]}`}
                src={part}
                alt=""
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
