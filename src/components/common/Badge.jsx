import React from 'react';
import styles from './Badge.module.css';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon
}) {
  const combinedClass = [
    styles.badge,
    styles[variant] || styles.default,
    styles[size] || styles.md,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={combinedClass}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
