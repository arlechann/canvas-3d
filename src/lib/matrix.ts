import { numUtils } from './numUtils';
import { Writable } from './writable';

export namespace Matrix3x3 {
	const matrixKeys = [
		'm00', 'm01', 'm02',
		'm10', 'm11', 'm12',
		'm20', 'm21', 'm22'
	] as const;
	type MatrixKey = typeof matrixKeys[number];

	export type Matrix = Readonly<Record<MatrixKey, number>>;
	type MatrixArray = [
		number, number, number,
		number, number, number,
		number, number, number
	];

	export const matrix = (
		m00: number, m01: number, m02: number,
		m10: number, m11: number, m12: number,
		m20: number, m21: number, m22: number,
	): Matrix => ({
		m00, m01, m02,
		m10, m11, m12,
		m20, m21, m22,
	});

	export const toArray = (a: Matrix): MatrixArray => matrixKeys.map(key => a[key]) as MatrixArray;

	export const Zero: Matrix = matrix(
		0, 0, 0,
		0, 0, 0,
		0, 0, 0
	);

	export const Identity: Matrix = matrix(
		1, 0, 0,
		0, 1, 0,
		0, 0, 1
	);

	export const equal = (a: Matrix, b: Matrix): boolean =>
		numUtils.floatEqual(a.m00, b.m00) &&
		numUtils.floatEqual(a.m01, b.m01) &&
		numUtils.floatEqual(a.m02, b.m02) &&
		numUtils.floatEqual(a.m10, b.m10) &&
		numUtils.floatEqual(a.m11, b.m11) &&
		numUtils.floatEqual(a.m12, b.m12) &&
		numUtils.floatEqual(a.m20, b.m20) &&
		numUtils.floatEqual(a.m21, b.m21) &&
		numUtils.floatEqual(a.m22, b.m22);

	export const notEqual = (a: Matrix, b: Matrix): boolean =>
		numUtils.floatNotEqual(a.m00, b.m00) ||
		numUtils.floatNotEqual(a.m01, b.m01) ||
		numUtils.floatNotEqual(a.m02, b.m02) ||
		numUtils.floatNotEqual(a.m10, b.m10) ||
		numUtils.floatNotEqual(a.m11, b.m11) ||
		numUtils.floatNotEqual(a.m12, b.m12) ||
		numUtils.floatNotEqual(a.m20, b.m20) ||
		numUtils.floatNotEqual(a.m21, b.m21) ||
		numUtils.floatNotEqual(a.m22, b.m22);

	export const transpose = (a: Matrix): Matrix => matrix(
		a.m00, a.m10, a.m20,
		a.m01, a.m11, a.m21,
		a.m02, a.m12, a.m22
	);

	export const map = (f: (...a: number[]) => number, ...ms: [Matrix, ...Matrix[]]): Matrix => {
		const ret: Partial<Writable<Matrix>> = {};
		matrixKeys.forEach(key => ret[key] = f(...ms.map(m => m[key])));
		return ret as Matrix;
	};

	export const mul = (a: Matrix, k: number): Matrix => map(a => k * a, a);
	export const compose = (a: Matrix, b: Matrix): Matrix => {
		const a_array = toArray(a);
		const b_array = toArray(b);
		const ret = [
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
		] as MatrixArray;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				for (let k = 0; k < 3; k++) {
					ret[i * 3 + j] += a_array[i * 3 + k] * b_array[k * 3 + j];
				}
			}
		}
		return matrix(...ret);
	}
}