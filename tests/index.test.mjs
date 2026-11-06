import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('energy reference', () => {
  assert.equal(api.batteryEnergy(12, 100), 1200);
});
test('runtime loss and reserve', () => {
  assert.equal(api.runtimeHours(1200, 100, 0.9, 0.2), 8.64);
});
test('charge planning', () => {
  assert.equal(api.chargeHours(100, 10, 0.2, 0.8, 0.8), 7.500000000000001);
});
test('zero energy or interval', () => {
  assert.equal(api.runtimeHours(0, 100), 0);
  assert.equal(api.runtimeHours(100, 10, 1, 1), 0);
  assert.equal(api.chargeHours(10, 1, 0.5, 0.5), 0);
});
test('invalid domains', () => {
  assert.throws(() => api.runtimeHours(100, 0));
  assert.throws(() => api.chargeHours(100, 10, 0.8, 0.2));
  assert.throws(() => api.runtimeHours(100, 10, 1.1));
  assert.throws(() => api.batteryEnergy(-1, 10));
});
test('energy conservation oracle', () => {
  for (let w = 10; w <= 100; w += 10) {
    const h = api.runtimeHours(1000, w, 0.75, 0.1);
    assert.ok(Math.abs(h * w - 675) < 1e-10);
  }
  assert.throws(() => api.batteryEnergy(1e300, 1e300));
});
