export const assertEqual = <T>(actual: T, expect: T): void => {
	console.log('.');
	console.assert(actual === expect, `${expect} expected but actually ${actual}`);
};

export const assertEqualBy = <T>(actual: T, expect: T, comp: (act: T, exp: T) => boolean): void => {
	console.log('.');
	console.assert(comp(actual, expect), `${expect} expected but actually ${actual}`);
};