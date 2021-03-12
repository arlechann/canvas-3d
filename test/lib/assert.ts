exports.assertEqual = <T>(actual: T, expect: T): void => {
	console.log('.');
	console.assert(actual === expect, `${expect} expected but actually ${actual}`);
};
