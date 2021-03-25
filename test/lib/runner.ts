type TestCase = () => void;

export interface Runner {
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
			console.log(`"${key}" done`)
		});
		this.success();
	},
	success: function () {
		console.log('\nAll tests done.');
	},
	failed: function () {
		console.log('Failed.');
	}
};
