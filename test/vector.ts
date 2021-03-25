import type { Runner } from './lib/runner';
import { Assert } from './lib/assert';
import { Vector3 } from '../src/lib/vector';
import { Angle } from '../src/lib/angle';

export const vecTest = (runner: Runner) => {
	runner.testCases.equalVec = () => {
		Assert.equal(Vector3.equal({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }), true);
		Assert.equal(Vector3.equal({ x: 0, y: 1, z: 2 }, { x: 0, y: 1, z: 2 }), true);
		Assert.equal(Vector3.equal({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }), false);
		Assert.equal(Vector3.equal({ x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 2 }), false);
		Assert.equal(Vector3.equal({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }), false);
	}

	runner.testCases.notEqualVec = () => {
		Assert.equal(Vector3.notEqual({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }), false);
		Assert.equal(Vector3.notEqual({ x: 0, y: 1, z: 2 }, { x: 0, y: 1, z: 2 }), false);
		Assert.equal(Vector3.notEqual({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }), true);
		Assert.equal(Vector3.notEqual({ x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 2 }), true);
		Assert.equal(Vector3.notEqual({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }), true);
	}

	runner.testCases.createVec = () => {
		Assert.equalBy(Vector3.vec(0, 1, 2), { x: 0, y: 1, z: 2 }, Vector3.equal);
		Assert.equalBy(Vector3.vec(-3, -2, -1), { x: -3, y: -2, z: -1 }, Vector3.equal);
		Assert.equalBy(Vector3.vec(0.5, 1.5, 2.5), { x: 0.5, y: 1.5, z: 2.5 }, Vector3.equal);
	};

	runner.testCases.copyVec = () => {
		Assert.equalBy(Vector3.copy({ x: 0, y: 1, z: 2 }), { x: 0, y: 1, z: 2 }, Vector3.equal);
		Assert.equalBy(Vector3.copy({ x: -3, y: -2, z: -1 }), { x: -3, y: -2, z: -1 }, Vector3.equal);
		Assert.equalBy(Vector3.copy({ x: 0.5, y: 1.5, z: 2.5 }), { x: 0.5, y: 1.5, z: 2.5 }, Vector3.equal);
	};

	runner.testCases.lengthVec = () => {
		Assert.equal(Vector3.length({ x: 0, y: 0, z: 0 }), 0);
		Assert.equal(Vector3.length({ x: 1, y: 1, z: 1 }), Math.hypot(1, 1, 1));
		Assert.equal(Vector3.length({ x: 1, y: 2, z: 3 }), Math.hypot(1, 2, 3));
		Assert.equal(Vector3.length({ x: 5, y: -10, z: 15 }), Math.hypot(5, -10, 15));
	};

	runner.testCases.negVec = () => {
		Assert.equalBy(Vector3.neg({ x: 0, y: 1, z: 2 }), { x: 0, y: -1, z: -2 }, Vector3.equal);
		Assert.equalBy(Vector3.neg({ x: -3, y: -2, z: -1 }), { x: 3, y: 2, z: 1 }, Vector3.equal);
		Assert.equalBy(Vector3.neg({ x: 0.5, y: 1.5, z: 2.5 }), { x: -0.5, y: -1.5, z: -2.5 }, Vector3.equal);
	};

	runner.testCases.mulVec = () => {
		Assert.equalBy(Vector3.mul({ x: 0, y: 0, z: 0 }, 1), { x: 0, y: 0, z: 0 }, Vector3.equal);
		Assert.equalBy(Vector3.mul({ x: 0, y: 1, z: 2 }, 2), { x: 0, y: 2, z: 4 }, Vector3.equal);
		Assert.equalBy(Vector3.mul({ x: 1, y: 1, z: 1 }, 5), { x: 5, y: 5, z: 5 }, Vector3.equal);
		Assert.equalBy(Vector3.mul({ x: 1, y: 2, z: 3 }, 10), { x: 10, y: 20, z: 30 }, Vector3.equal);
		Assert.equalBy(Vector3.mul({ x: 1, y: 2, z: 3 }, -5), { x: -5, y: -10, z: -15 }, Vector3.equal);
		Assert.equalBy(Vector3.mul({ x: 1, y: 2, z: 3 }, -10), { x: -10, y: -20, z: -30 }, Vector3.equal);
	}

	runner.testCases.divVec = () => {
		Assert.equalBy(Vector3.div({ x: 0, y: 0, z: 0 }, 1), { x: 0, y: 0, z: 0 }, Vector3.equal);
		Assert.equalBy(Vector3.div({ x: 0, y: 2, z: 4 }, 2), { x: 0, y: 1, z: 2 }, Vector3.equal);
		Assert.equalBy(Vector3.div({ x: 5, y: 5, z: 5 }, 5), { x: 1, y: 1, z: 1 }, Vector3.equal);
		Assert.equalBy(Vector3.div({ x: 10, y: 20, z: 30 }, 10), { x: 1, y: 2, z: 3 }, Vector3.equal);
		Assert.equalBy(Vector3.div({ x: -5, y: -10, z: -15 }, -5), { x: 1, y: 2, z: 3 }, Vector3.equal);
		Assert.equalBy(Vector3.div({ x: -10, y: -20, z: -30 }, -10), { x: 1, y: 2, z: 3 }, Vector3.equal);
	}

	runner.testCases.normalizeVec = () => {
		Assert.equalBy(
			Vector3.normalize({ x: 0, y: 1, z: 2 }),
			Vector3.div({ x: 0, y: 1, z: 2 }, Vector3.length({ x: 0, y: 1, z: 2 })),
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.normalize({ x: 1, y: 1, z: 1 }),
			Vector3.div({ x: 1, y: 1, z: 1 }, Vector3.length({ x: 1, y: 1, z: 1 })),
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.normalize({ x: 1, y: 2, z: 3 }),
			Vector3.div({ x: 1, y: 2, z: 3 }, Vector3.length({ x: 1, y: 2, z: 3 })),
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.normalize({ x: -1, y: -2, z: -3 }),
			Vector3.div({ x: -1, y: -2, z: -3 }, Vector3.length({ x: -1, y: -2, z: -3 })),
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.normalize({ x: -5, y: -10, z: -15 }),
			Vector3.div({ x: -5, y: -10, z: -15 }, Vector3.length({ x: -5, y: -10, z: -15 })),
			Vector3.equal
		);
	}

	runner.testCases.addVec = () => {
		Assert.equalBy(
			Vector3.add({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }),
			{ x: 0, y: 0, z: 0 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.add({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }),
			{ x: 1, y: 2, z: 3 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.add({ x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 0 }),
			{ x: 1, y: 2, z: 3 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.add({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }),
			{ x: 2, y: 4, z: 6 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.add({ x: 1, y: 2, z: 3 }, { x: -3, y: -2, z: -1 }),
			{ x: -2, y: 0, z: 2 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.add({ x: -1, y: -2, z: -3 }, { x: 3, y: 2, z: 1 }),
			{ x: 2, y: 0, z: -2 },
			Vector3.equal
		);
	};

	runner.testCases.subVec = () => {
		Assert.equalBy(
			Vector3.sub({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }),
			{ x: 0, y: 0, z: 0 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.sub({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }),
			{ x: -1, y: -2, z: -3 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.sub({ x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 0 }),
			{ x: 1, y: 2, z: 3 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.sub({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }),
			{ x: 0, y: 0, z: 0 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.sub({ x: 1, y: 2, z: 3 }, { x: -3, y: -2, z: -1 }),
			{ x: 4, y: 4, z: 4 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.sub({ x: -1, y: -2, z: -3 }, { x: 3, y: 2, z: 1 }),
			{ x: -4, y: -4, z: -4 },
			Vector3.equal
		);
	};

	runner.testCases.diffVec = () => {
		Assert.equal(
			Vector3.diff({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }),
			Vector3.length({ x: 0, y: 0, z: 0 })
		);
		Assert.equal(
			Vector3.diff({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }),
			Vector3.length({ x: -1, y: -2, z: -3 })
		);
		Assert.equal(
			Vector3.diff({ x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 0 }),
			Vector3.length({ x: 1, y: 2, z: 3 })
		);
		Assert.equal(
			Vector3.diff({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }),
			Vector3.length({ x: 0, y: 0, z: 0 })
		);
		Assert.equal(
			Vector3.diff({ x: 1, y: 2, z: 3 }, { x: -3, y: -2, z: -1 }),
			Vector3.length({ x: 4, y: 4, z: 4 })
		);
		Assert.equal(
			Vector3.diff({ x: -1, y: -2, z: -3 }, { x: 3, y: 2, z: 1 }),
			Vector3.length({ x: -4, y: -4, z: -4 })
		);
	};

	runner.testCases.dotVec = () => {
		Assert.equal(
			Vector3.dot({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }),
			0
		);
		Assert.equal(
			Vector3.dot({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }),
			0
		);
		Assert.equal(
			Vector3.dot({ x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 0 }),
			0
		);
		Assert.equal(
			Vector3.dot({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }),
			14
		);
		Assert.equal(
			Vector3.dot({ x: 1, y: 2, z: 3 }, { x: -3, y: -2, z: -1 }),
			-10
		);
		Assert.equal(
			Vector3.dot({ x: -1, y: -2, z: -3 }, { x: 3, y: 2, z: 1 }),
			-10
		);
	};

	runner.testCases.argVec = () => {
		Assert.equalBy(
			Vector3.arg({ x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 1 }),
			{ type: 'Rad', value: Math.PI / 2 },
			Angle.equal
		);
		Assert.equalBy(
			Vector3.arg({ x: 1, y: 1, z: 0 }, { x: 1, y: 0, z: 0 }),
			{ type: 'Rad', value: Math.PI / 4 },
			Angle.equal
		);
		Assert.equalBy(
			Vector3.arg({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }),
			{ type: 'Rad', value: 0 },
			Angle.equal
		);
		Assert.equalBy(
			Vector3.arg({ x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }),
			{ type: 'Rad', value: Math.PI },
			Angle.equal
		);
		Assert.equalBy(
			Vector3.arg({ x: 1, y: 1, z: 1 }, { x: -1, y: -1, z: -1 }),
			{ type: 'Rad', value: Math.PI },
			Angle.equal
		);
	};

	runner.testCases.isRightAngleVec = () => {
		Assert.equal(
			Vector3.isRightAngle({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }),
			true
		);
		Assert.equal(
			Vector3.isRightAngle({ x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 1 }),
			true
		);
		Assert.equal(
			Vector3.isRightAngle({ x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 0 }),
			true
		);
		Assert.equal(
			Vector3.isRightAngle({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }),
			false
		);
		Assert.equal(
			Vector3.isRightAngle({ x: 1, y: 2, z: 3 }, { x: -3, y: -2, z: -1 }),
			false
		);
		Assert.equal(
			Vector3.isRightAngle({ x: -1, y: -2, z: -3 }, { x: 3, y: 2, z: 1 }),
			false
		);
	};

	runner.testCases.crossVec = () => {
		Assert.equalBy(
			Vector3.cross({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }),
			{ x: 0, y: 0, z: 0 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.cross({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }),
			{ x: 0, y: 0, z: 0 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.cross({ x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 0 }),
			{ x: 0, y: 0, z: 0 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.cross({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }),
			{ x: 0, y: 0, z: 0 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.cross({ x: 1, y: 2, z: 3 }, { x: -3, y: -2, z: -1 }),
			{ x: 4, y: -8, z: 4 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.cross({ x: -1, y: -2, z: -3 }, { x: 3, y: 2, z: 1 }),
			{ x: 4, y: -8, z: 4 },
			Vector3.equal
		);
	};

	runner.testCases.projectVec = () => {
		Assert.equalBy(
			Vector3.project({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }),
			{ x: 0, y: 0, z: 0 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.project({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }),
			{ x: 1, y: 2, z: 3 },
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.project({ x: 1, y: 2, z: 3 }, { x: -3, y: -2, z: -1 }),
			Vector3.mul({ x: -3, y: -2, z: -1 }, Vector3.dot({ x: 1, y: 2, z: 3 }, { x: -3, y: -2, z: -1 }) / (Vector3.length({ x: -3, y: -2, z: -1 }) * Vector3.length({ x: -3, y: -2, z: -1 }))),
			Vector3.equal
		);
		Assert.equalBy(
			Vector3.project({ x: -1, y: -2, z: -3 }, { x: 3, y: 2, z: 1 }),
			Vector3.mul({ x: 3, y: 2, z: 1 }, Vector3.dot({ x: -1, y: -2, z: -3 }, { x: 3, y: 2, z: 1 }) / (Vector3.length({ x: 3, y: 2, z: 1 }) * Vector3.length({ x: 3, y: 2, z: 1 }))),
			Vector3.equal
		);
	};
};
