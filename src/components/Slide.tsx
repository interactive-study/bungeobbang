import { ReactNode } from 'react';
import styles from './Slide.module.css';

interface Props {
  children?: ReactNode;
}

export function Slide({ children }: Props) {
  return <div className={styles.slide}>{children}</div>;
}
