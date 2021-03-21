import { numUtils } from './numUtils.js';

export namespace Angle {
	const PI = Math.PI;
	const PI2 = 2 * PI;

	export type Rad = {
		readonly type: 'Rad';
		readonly value: number;
	};

	export type Deg = {
		readonly type: 'Deg';
		readonly value: number;
	};

	export const rad = (theta: number): Rad => ({ type: 'Rad', value: theta });
	export const deg = (theta: number): Deg => ({ type: 'Deg', value: theta });

	export const equal = (theta: Rad, omega: Rad): boolean => numUtils.floatEqual(theta.value, omega.value);
	export const notEqual = (theta: Rad, omega: Rad): boolean => numUtils.floatNotEqual(theta.value, omega.value);

	export const radToDeg = (theta: Rad): Deg => deg(theta.value * 360 / PI2);
	export const degToRad = (theta: Deg): Rad => rad(theta.value * PI2 / 360);

	export const sin = (theta: Rad) => Math.sin(theta.value);
	export const cos = (theta: Rad) => Math.cos(theta.value);
	export const asin = (x: number) => rad(Math.asin(x));
	export const acos = (x: number) => rad(Math.acos(x));

	// 角度 [0, inf) を [-PI, PI) に正規化する
	export const normalize = (theta: Rad): Rad => {
		let a = theta.value;
		a += PI;
		a -= Math.trunc(a / PI2) * PI2;
		a -= PI;
		return rad(a);
	}

	// clamp してから acos
	export const safeAcos = (x: number): Rad => acos(numUtils.clamp(x, -1.0, 1.0));
}
