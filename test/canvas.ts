import { runner } from './lib/runner.js';
import { Assert } from './lib/assert.js';
import { bresenham } from '../src/canvas.js';

const arrayEqualBy = <T>(a: T[], b: T[], f: (c: T, d: T) => boolean): boolean => {
	if (a.length !== b.length) { return false; }
	return a.every((e: T, i: number) => f(e, b[i]));
}

const plotEqual = (a: [number, number], b: [number, number]) => a[0] === b[0] && a[1] === b[1];
const plotsEqual = (a: [number, number][], b: [number, number][]) => arrayEqualBy(a, b, plotEqual);

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

runner.run();