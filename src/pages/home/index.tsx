import { useContext, useState } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router';
import { InfringementContext } from '@/contexts/InfringementContext';
import Document from '@/components/Document';

export default function Home() {
  /**
   * ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution
   */
  const { encountered } = useContext(InfringementContext);
  /**
   * ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution
   */

  const [showDocumentButton, setShowDocumentButton] = useState(encountered);
  const [showDocument, setShowDocument] = useState(false);

  return (
    <div className={styles.page}>
      <Link
        className={`${styles.link} ${!encountered ? styles.red : styles.yellow}`}
        to="/maker"
      >
        Pick
      </Link>
      <Link
        className={`${styles.link} ${!encountered ? styles.yellow : styles.blue}`}
        to="/slides"
      >
        Press
      </Link>
      <Link
        className={`${styles.link} ${!encountered ? styles.blue : styles.red}`}
        to="/slides"
      >
        Play
      </Link>

      {showDocumentButton && (
        <div
          className={styles.showDocument}
          onClick={() => {
            setShowDocument(true);
            setShowDocumentButton(false);
          }}
        />
      )}
      {showDocument && (
        <Document
          onEnd={() => {
            setShowDocument(false);
          }}
        />
      )}
    </div>
  );
}
