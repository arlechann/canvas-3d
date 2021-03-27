import { Angle } from './angle';
import { numUtils } from './numUtils';
import { Vector3 } from './vector3';
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

	export const rotateWithX = (theta: Angle.Rad): Matrix => matrix(
		1, 0, 0,
		0, Angle.cos(theta), Angle.sin(theta),
		0, -Angle.sin(theta), Angle.cos(theta)
	);

	export const rotateWithY = (theta: Angle.Rad): Matrix => matrix(
		Angle.cos(theta), 0, -Angle.sin(theta),
		0, 1, 0,
		Angle.sin(theta), 0, Angle.cos(theta)
	);

	export const rotateWithZ = (theta: Angle.Rad): Matrix => matrix(
		Angle.cos(theta), Angle.sin(theta), 0,
		-Angle.sin(theta), Angle.cos(theta), 0,
		0, 0, 1
	);

	export const rotate = (axis: Vector3.Vec, theta: Angle.Rad): Matrix => {
		const n = Vector3.normalize(axis);
		return matrix(
			n.x * n.x * (1 - Angle.cos(theta)) + Angle.cos(theta), n.x * n.y * (1 - Angle.cos(theta)) + n.z * Angle.sin(theta), n.x * n.z * (1 - Angle.cos(theta)) - n.y * Angle.sin(theta),
			n.x * n.y * (1 - Angle.cos(theta)) - n.z * Angle.sin(theta), n.y * n.y * (1 - Angle.cos(theta)) + Angle.cos(theta), n.y * n.z * (1 - Angle.cos(theta)) + n.x * Angle.sin(theta),
			n.x * n.z * (1 - Angle.cos(theta)) + n.y * Angle.sin(theta), n.y * n.z * (1 - Angle.cos(theta)) - n.x * Angle.sin(theta), n.z * n.z * (1 - Angle.cos(theta)) + Angle.cos(theta),
		);
	}

	export const scaleWithX = (k: number): Matrix => matrix(
		k, 0, 0,
		0, 1, 0,
		0, 0, 1
	);

	export const scaleWithY = (k: number): Matrix => matrix(
		1, 0, 0,
		0, k, 0,
		0, 0, 1
	);

	export const scaleWithZ = (k: number): Matrix => matrix(
		1, 0, 0,
		0, 1, 0,
		0, 0, k
	);

	export const scale = (axis: Vector3.Vec, k: number): Matrix => {
		const n = Vector3.normalize(axis);
		return matrix(
			1 + (k - 1) * n.x * n.x, (k - 1) * n.x * n.y, (k - 1) * n.x * n.z,
			(k - 1) * n.y * n.x, 1 + (k - 1) * n.y * n.y, (k - 1) * n.y * n.z,
			(k - 1) * n.z * n.x, (k - 1) * n.z * n.y, 1 + (k - 1) * n.z * n.z,
		);
	}

	export const projectionToXY = (): Matrix => scaleWithZ(0);
	export const projectionToYZ = (): Matrix => scaleWithX(0);
	export const projectionToXZ = (): Matrix => scaleWithY(0);
	export const projection = (axis: Vector3.Vec): Matrix => scale(axis, 0);

	export const reflection = (axis: Vector3.Vec): Matrix => scale(axis, -1);

	export const shearWithXY = (s: number, t: number): Matrix => matrix(
		1, 0, 0,
		0, 1, 0,
		s, t, 1
	);

	export const shearWithYZ = (s: number, t: number): Matrix => matrix(
		1, s, t,
		0, 1, 0,
		0, 0, 1
	);

	export const shearWithXZ = (s: number, t: number): Matrix => matrix(
		1, 0, 0,
		s, 1, t,
		0, 0, 1
	);
}