import React from 'react';
import styles from './Container.module.css';

/**
 * Reusable page container enforcing max-width and consistent padding.
 */
export default function Container({ children, narrow = false, className = '' }) {
  const containerClass = `${styles.container} ${narrow ? styles.narrow : ''} ${className}`.trim();
  return <div className={containerClass}>{children}</div>;
}
