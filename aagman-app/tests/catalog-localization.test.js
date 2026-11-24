import test from 'node:test';
import assert from 'node:assert/strict';
import { DESTINATIONS } from '../src/data/destinations.js';
import { FESTIVALS } from '../src/data/festivals.js';

test('the current destination catalog has a Hindi display name for every entry', () => {
  assert.ok(DESTINATIONS.length >= 23);
  const missing = DESTINATIONS.filter(item => !item.nameHi);
  assert.deepEqual(missing.map(item => item.id), []);
});

test('the current festival catalog has complete Marathi and Hindi copy for core details', () => {
  assert.ok(FESTIVALS.length >= 6);
  const requiredFields = [
    'nameHi', 'descriptionMr', 'descriptionHi',
    'significanceMr', 'significanceHi',
    'locationMr', 'locationHi', 'datesMr', 'datesHi',
    'highlightsMr', 'highlightsHi'
  ];
  const missing = FESTIVALS.flatMap(item =>
    requiredFields.filter(field => item[field] === undefined || item[field] === null || item[field] === '')
      .map(field => `${item.id}.${field}`)
  );
  assert.deepEqual(missing, []);
});
