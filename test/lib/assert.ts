export namespace Assert {
	export const equal = <T>(actual: T, expect: T): void => {
		console.log('.');
		console.assert(actual === expect, `${expect} expected but actually ${actual}`);
	};

	export const equalBy = <T>(actual: T, expect: T, comp: (act: T, exp: T) => boolean): void => {
		console.log('.');
		console.assert(comp(actual, expect), `${JSON.stringify(expect)} expected but actually ${JSON.stringify(actual)}`);
	};
}