import { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import Bungeo from '@/assets/Bungeo.png';
import Warn1 from '@/assets/AddictionWarn1.png';
import Warn2 from '@/assets/AddictionWarn2.png';
import Warn3 from '@/assets/AddictionWarn3.png';
import Warn4 from '@/assets/AddictionWarn4.png';
import styles from './styles.module.css';

const CURE_LIMIT = 5;
const WARN_IMAGES = [Warn1, Warn2, Warn3, Warn4];

export default function BungeobbangMold() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [moldSrc, setMoldSrc] = useState<string>(Bungeo);
  const [cureCount, setCureCount] = useState<number>(0);
  const [warnIndex, setWarnIndex] = useState<number>(-1);
  const [isShowWarnBoard, setIsShowWarnBoard] = useState<boolean>(false);

  // 상태 계산
  const isLimitReached = cureCount >= CURE_LIMIT;
  const hoverEnabled = !isLimitReached;
  const homeButtonActive = hoverEnabled && isShowWarnBoard;
  const homeButtonText = homeButtonActive ? "CAN'T" : 'HOME';
  const homeButtonClass = [
    styles.normal_button,
    homeButtonActive && styles.warn_button_active,
  ]
    .filter(Boolean)
    .join(' ');
  const shouldRenderWarnBoard =
    hoverEnabled && isShowWarnBoard && warnIndex >= 0;

  // 파일 업로드
  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMoldSrc(reader.result as string);
      fileInputRef.current!.value = '';
    };
    reader.readAsDataURL(file);
  };

  // 경고 이미지 순환 (hover 시 인덱스만 바꿔두고, 실제 보이기는 onLoad에서 처리)
  const handleWarnEnter = () => {
    if (!hoverEnabled) return;
    const next = (warnIndex + 1) % WARN_IMAGES.length;
    setWarnIndex(next);
    setIsShowWarnBoard(false);
  };

  // HOME 클릭 시, cureCount >= 5일 때만 루트로 이동
  const handleHomeClick = () => {
    if (isLimitReached) {
      setIsShowWarnBoard(false);
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.button_container}>
        {/* UPLOAD */}
        <button
          type="button"
          className={styles.upload_button}
          onClick={handleUpload}
        >
          <span className={styles.uplaod_button_text}>UPLOAD</span>
          <div className={styles.liquid} />
        </button>

        {/* RESET */}
        <button
          type="button"
          className={styles.normal_button}
          onClick={() => setMoldSrc(Bungeo)}
        >
          <span className={styles.normal_button_text}>RESET</span>
        </button>

        {/* HOME (warnBoard) */}
        <div
          className={styles.board_container}
          onMouseEnter={hoverEnabled ? handleWarnEnter : undefined}
          onMouseLeave={
            hoverEnabled ? () => setIsShowWarnBoard(false) : undefined
          }
        >
          <button
            type="button"
            className={homeButtonClass}
            onClick={handleHomeClick}
          >
            {homeButtonText}
          </button>

          {/* 프리로드용 숨김 이미지 */}
          {warnIndex >= 0 && (
            <img
              src={WARN_IMAGES[warnIndex]}
              alt={`preload warning ${warnIndex + 1}`}
              style={{ display: 'none' }}
              onLoad={() => setIsShowWarnBoard(true)}
            />
          )}

          {/* 실제 경고판 */}
          {shouldRenderWarnBoard && (
            <div className={styles.warn_board}>
              <img
                src={WARN_IMAGES[warnIndex]}
                alt={`Warning ${warnIndex + 1}`}
                className={styles.warn_board_img}
              />
            </div>
          )}
        </div>
      </div>

      {/* CURE 버튼 */}
      <button
        type="button"
        className={styles.cure_button}
        onClick={() => setCureCount((prev) => prev + 1)}
      >
        CURE
      </button>

      {/* 파일 입력 숨김 */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* 붕어빵 이미지 */}
      <img src={moldSrc} alt="Bungeo" className={styles.bungeo_image} />
    </div>
  );
}
