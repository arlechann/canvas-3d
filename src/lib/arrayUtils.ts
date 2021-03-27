export namespace ArrayUtils {
	export const arrayEqualBy = <T>(a: T[], b: T[], f: (c: T, d: T) => boolean): boolean => {
		if (a.length !== b.length) { return false; }
		return a.every((e: T, i: number) => f(e, b[i]));
	}
}