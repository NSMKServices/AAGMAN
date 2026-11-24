/**
 * Resolve a localized field from a content record.
 *
 * Preferred field naming:
 *   nameMr / nameHi
 *   summaryMr / summaryHi
 *   highlightsMr / highlightsHi
 *
 * Legacy Marathi name fields remain supported for existing catalog records.
 * Missing translations intentionally fall back to the source-language value;
 * the content audit can identify records that still need a translation.
 */
export function getLocalizedValue(record, field, language, fallbackField) {
  if (!record) return '';

  if (language === 'mr') {
    const localized = record[`${field}Mr`]
      ?? (field === 'name' ? record.marathiName : undefined);
    if (localized !== undefined && localized !== null && localized !== '') {
      return localized;
    }
  }

  if (language === 'hi') {
    const localized = record[`${field}Hi`]
      ?? (field === 'name' ? record.hindiName : undefined);
    if (localized !== undefined && localized !== null && localized !== '') {
      return localized;
    }
  }

  return record[field] ?? (fallbackField ? record[fallbackField] : undefined) ?? '';
}

export function getLocalizedName(record, language) {
  return getLocalizedValue(record, 'name', language);
}
