import { useContext } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router';
import { InfringementContext } from '@/contexts/InfringementContext';

export default function Navigator() {
  /**
   * ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution
   */
  const { encountered } = useContext(InfringementContext);
  /**
   * ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution ! Use with caution
   */

  return (
    <div className={styles.Navigator}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <Link to="/slides">
          <path
            d="M50,50 L50,0 A50,50 0 0,1 93.3,75 z"
            fill={encountered ? '#ff0000' : '#0000ff'}
          />
        </Link>
        <Link to="/mold">
          <path
            d="M50,50 L93.3,75 A50,50 0 0,1 6.7,75 z"
            fill={encountered ? '#0000ff' : '#ffff00'}
          />
        </Link>
        <Link to="/maker">
          <path
            d="M50,50 L6.7,75 A50,50 0 0,1 50,0 z"
            fill={encountered ? '#ffff00' : '#ff0000'}
          />
        </Link>
      </svg>
    </div>
  );
}
