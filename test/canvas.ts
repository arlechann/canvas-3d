import type { Runner } from './lib/runner';
import { Assert } from './lib/assert';
import { ArrayUtils } from '../src/lib/arrayUtils';
import { bresenham } from '../src/canvas';

const plotEqual = (a: [number, number], b: [number, number]) => a[0] === b[0] && a[1] === b[1];
const plotsEqual = (a: [number, number][], b: [number, number][]) => ArrayUtils.arrayEqualBy(a, b, plotEqual);

export const canvasTest = (runner: Runner) => {
	runner.testCases.bresenham = () => {
		Assert.equalBy(
			bresenham(0, 0, 3, 2),
			[[0, 0], [1, 1], [2, 1], [3, 2]] as [number, number][],
			plotsEqual
		)
		Assert.equalBy(
			bresenham(0, 0, 2, 3),
			[[0, 0], [1, 1], [1, 2], [2, 3]] as [number, number][],
			plotsEqual
		)
		Assert.equalBy(
			bresenham(3, 2, 0, 0),
			[[3, 2], [2, 1], [1, 1], [0, 0]] as [number, number][],
			plotsEqual
		)
		Assert.equalBy(
			bresenham(2, 3, 0, 0),
			[[2, 3], [1, 2], [1, 1], [0, 0]] as [number, number][],
			plotsEqual
		)
	}
};