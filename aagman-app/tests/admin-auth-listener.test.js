import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('admin auth listener is synchronous and registered after session initialization', async () => {
  const source = await readFile(new URL('../src/context/AdminAuthContext.jsx', import.meta.url), 'utf8');
  const getSessionIndex = source.indexOf('await supabase.auth.getSession()');
  const listenerIndex = source.indexOf('supabase.auth.onAuthStateChange(handleAuthStateChange)');

  assert.ok(getSessionIndex >= 0, 'session initialization must be present');
  assert.ok(listenerIndex > getSessionIndex, 'auth listener must be registered after getSession resolves');
  assert.doesNotMatch(source, /onAuthStateChange\s*\(\s*async/);
  assert.match(source, /setTimeout\(\(\) => \{[\s\S]*?fetchAdminProfile\(/);
});
