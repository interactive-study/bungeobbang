import Bungeo from '@/assets/Bungeo.png';
import Upload from '@/assets/Upload.svg?react';
import styles from './styles.module.css';

export default function BungeobbangMold() {
  return (
    <div>
      <div>
        <button className={styles.upload_button}>
          <Upload /> UPLOAD
        </button>
        <img src={Bungeo} alt="Bungeo" className={styles.bungeo_image} />
      </div>
    </div>
  );
}
