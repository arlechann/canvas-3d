export namespace numUtils {
	export const EPS = 1e-15;

	export const floatEqual = (a: number, b: number): boolean => Math.abs(a - b) <= EPS;
	export const floatNotEqual = (a: number, b: number): boolean => Math.abs(a - b) > EPS;
	export const clamp = (a: number, low: number, high: number) => Math.max(low, Math.min(a, high));
}