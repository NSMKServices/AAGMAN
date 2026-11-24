import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocalizedName, getLocalizedValue } from '../src/utils/localizedContent.js';

test('uses the existing Marathi name field for legacy records', () => {
  const record = { name: 'Raigad Fort', marathiName: 'किल्ले रायगड' };
  assert.equal(getLocalizedName(record, 'mr'), 'किल्ले रायगड');
});

test('uses explicit Hindi and Marathi fields when present', () => {
  const record = {
    name: 'Raigad Fort',
    nameMr: 'किल्ले रायगड',
    nameHi: 'रायगढ़ किला'
  };
  assert.equal(getLocalizedName(record, 'mr'), 'किल्ले रायगड');
  assert.equal(getLocalizedName(record, 'hi'), 'रायगढ़ किला');
});

test('falls back to the source field when a translation is not yet available', () => {
  const record = { name: 'Ganeshotsav', description: 'A public cultural festival.' };
  assert.equal(getLocalizedName(record, 'hi'), 'Ganeshotsav');
  assert.equal(getLocalizedValue(record, 'description', 'mr'), 'A public cultural festival.');
});

test('supports localized arrays such as attraction and festival highlight lists', () => {
  const record = {
    highlights: ['Palkhi procession'],
    highlightsMr: ['पालखी मिरवणूक'],
    highlightsHi: ['पालखी जुलूस']
  };
  assert.deepEqual(getLocalizedValue(record, 'highlights', 'mr'), ['पालखी मिरवणूक']);
  assert.deepEqual(getLocalizedValue(record, 'highlights', 'hi'), ['पालखी जुलूस']);
});

test('returns an empty string for a missing record', () => {
  assert.equal(getLocalizedValue(null, 'name', 'en'), '');
});
