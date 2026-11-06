import { batteryEnergy, runtimeHours } from '@lp-labs/battery-runtime';
if (runtimeHours(batteryEnergy(12, 100), 100) !== 12) throw new Error('Runtime');
// @ts-expect-error invalid argument must be rejected by declarations
runtimeHours('1200', 100);
