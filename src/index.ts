function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export function batteryEnergy(volts: number, ampHours: number): number {
  return finite(finite(volts, Number.MIN_VALUE) * finite(ampHours, 0), 0);
}
export function runtimeHours(
  wattHours: number,
  loadWatts: number,
  efficiency = 1,
  reserveFraction = 0,
): number {
  finite(wattHours, 0);
  finite(loadWatts, Number.MIN_VALUE);
  finite(efficiency, Number.MIN_VALUE, 1);
  finite(reserveFraction, 0, 1);
  return finite((wattHours * (1 - reserveFraction) * efficiency) / loadWatts, 0);
}
export function chargeHours(
  capacityAh: number,
  currentA: number,
  startFraction = 0,
  endFraction = 1,
  efficiency = 1,
): number {
  finite(capacityAh, 0);
  finite(currentA, Number.MIN_VALUE);
  finite(startFraction, 0, 1);
  finite(endFraction, startFraction, 1);
  finite(efficiency, Number.MIN_VALUE, 1);
  return finite((capacityAh * (endFraction - startFraction)) / currentA / efficiency, 0);
}
