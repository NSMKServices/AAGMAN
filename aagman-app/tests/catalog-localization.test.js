import test from 'node:test';
import assert from 'node:assert/strict';
import { DESTINATIONS } from '../src/data/destinations.js';
import { FESTIVALS } from '../src/data/festivals.js';

test('the current destination catalog has a Hindi display name for every entry', () => {
  assert.equal(DESTINATIONS.length, 52);
  const missing = DESTINATIONS.filter(item => !item.nameHi);
  assert.deepEqual(missing.map(item => item.id), []);
});

test('the current festival catalog has complete Marathi and Hindi copy for core details', () => {
  assert.equal(FESTIVALS.length, 15);
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

test('destination IDs are unique and every destination has map coordinates', () => {
  const ids = DESTINATIONS.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length);
  const invalid = DESTINATIONS.filter(item =>
    !item.coordinates ||
    !Number.isFinite(item.coordinates.lat) ||
    !Number.isFinite(item.coordinates.lng)
  );
  assert.deepEqual(invalid.map(item => item.id), []);
});

test('all newly added destination narratives are available in Marathi and Hindi', () => {
  const localized = DESTINATIONS.filter(item =>
    item.summaryMr && item.summaryHi &&
    item.historyMr && item.historyHi &&
    Array.isArray(item.attractionsMr) && item.attractionsMr.length > 0 &&
    Array.isArray(item.attractionsHi) && item.attractionsHi.length > 0
  );
  assert.ok(localized.length >= 29);
});

test('festival IDs are unique', () => {
  const ids = FESTIVALS.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length);
});
