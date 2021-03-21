import { Writable } from './writable';
import { Angle } from './angle.js';
import { numUtils } from './numUtils.js';

export namespace Vector3 {
	type VecKey = 'x' | 'y' | 'z';
	export type Vec = Readonly<Record<VecKey, number>>;

	export const vec = (x: number, y: number, z: number): Vec => ({ x, y, z });
	export const copy = (v: Vec): Vec => ({ x: v.x, y: v.y, z: v.z });
	export const Zero: Vec = vec(0, 0, 0);

	export const equal = (v: Vec, u: Vec): boolean => numUtils.floatEqual(v.x, u.x) && numUtils.floatEqual(v.y, u.y) && numUtils.floatEqual(v.z, u.z);
	export const notEqual = (v: Vec, u: Vec): boolean => numUtils.floatNotEqual(v.x, u.x) || numUtils.floatNotEqual(v.y, u.y) || numUtils.floatNotEqual(v.z, u.z);

	export const map = (f: (...a: number[]) => number, ...vs: [Vec, ...Vec[]]): Vec => {
		const ret: Partial<Writable<Vec>> = {};
		(Object.keys(vs[0]) as (keyof Vec)[]).forEach(key => { ret[key] = f(...vs.map(v => v[key])); });
		return ret as Vec;
	};

	export const length = (v: Vec): number => Math.hypot(...Object.values(v));
	export const neg = (v: Vec): Vec => map(a => -a, v);
	export const mul = (v: Vec, k: number): Vec => map(a => k * a, v);
	export const div = (v: Vec, k: number): Vec => map(a => a / k, v);
	export const normalize = (v: Vec): Vec => { const len = length(v); return len == 0 ? v : div(v, len); };
	export const add = (v: Vec, u: Vec): Vec => map((a, b) => a + b, v, u);
	export const sub = (v: Vec, u: Vec): Vec => map((a, b) => a - b, v, u);
	export const diff = (v: Vec, u: Vec): number => length(sub(v, u));
	export const dot = (v: Vec, u: Vec): number => Object.values(map((a, b) => a * b, v, u)).reduce((acc, x) => acc + x);
	export const arg = (v: Vec, u: Vec): Angle.Rad => Angle.safeAcos(dot(v, u) / (length(v) * length(u)));
	export const isRightAngle = (v: Vec, u: Vec): boolean => dot(u, v) == 0;
	export const cross = (v: Vec, u: Vec): Vec => ({
		x: v.y * u.z - v.z * u.y,
		y: v.z * u.x - v.x * u.z,
		z: v.x * u.y - v.y * u.x
	});

	// Project v to u
	export const project = (v: Vec, u: Vec): Vec => {
		const u_len = length(u);
		return mul(u, dot(v, u) / (u_len * u_len));
	}
};