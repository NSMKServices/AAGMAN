import React from 'react';
import { Search, X } from './Icons';
import styles from './SearchInput.module.css';

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  className = '',
  autoFocus = false
}) {
  return (
    <div className={`${styles.searchWrapper} ${className}`}>
      <span className={styles.searchIcon} aria-hidden="true">
        <Search size={16} />
      </span>
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={onClear || (() => onChange(''))}
          aria-label="Clear search query"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
