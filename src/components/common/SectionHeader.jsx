import React from 'react';
import styles from './SectionHeader.module.css';

/**
 * Editorial Section Heading Component
 * Implements standard editorial headings across public tourism sections:
 * - Small uppercase eyebrow
 * - Dark Heritage Brown serif heading
 * - Restrained Temple Gold ornamental hairline separator
 * - Centered supporting lead description
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  className = ''
}) {
  return (
    <div className={`${styles.headerWrapper} ${centered ? styles.centered : ''} ${className}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.goldDivider} aria-hidden="true">
        <span className={styles.line} />
        <span className={styles.ornament}>❖</span>
        <span className={styles.line} />
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
