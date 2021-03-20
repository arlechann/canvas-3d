type TestCase = () => void;

interface Runner {
	testCases: { [key: string]: TestCase };
	run: () => void;
	success: () => void;
	failed: () => void;
}

export const runner: Runner = {
	testCases: {},
	run: function () {
		Object.keys(this.testCases).forEach(key => {
			this.testCases[key]();
		});
	},
	success: function () {
		console.log('All tests passed.');
	},
	failed: function () {
		console.log('Failed.');
	}
};
