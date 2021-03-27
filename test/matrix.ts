import type { Runner } from './lib/runner'
import { Assert } from './lib/assert';
import { Matrix3x3 } from '../src/lib/matrix';
import { ArrayUtils } from '../src/lib/arrayUtils';
import { Angle } from '../src/lib/angle';

export const matrixTest = (runner: Runner) => {
	runner.testCases.equalMatrix = () => {
		Assert.equal(Matrix3x3.equal({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, {
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}), true);
		Assert.equal(Matrix3x3.equal({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, {
			m00: 1, m01: 4, m02: 7,
			m10: 2, m11: 5, m12: 8,
			m20: 3, m21: 6, m22: 9
		}), false);
	};

	runner.testCases.notEqualMatrix = () => {
		Assert.equal(Matrix3x3.notEqual({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, {
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}), false);
		Assert.equal(Matrix3x3.notEqual({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, {
			m00: 0, m01: 3, m02: 6,
			m10: 1, m11: 4, m12: 7,
			m20: 2, m21: 5, m22: 8
		}), true);
	};

	runner.testCases.matrix = () => {
		Assert.equalBy(Matrix3x3.matrix(
			0, 1, 2,
			3, 4, 5,
			6, 7, 8
		), {
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.matrix(
			0, 3, 6,
			1, 4, 7,
			2, 5, 8
		), {
			m00: 0, m01: 3, m02: 6,
			m10: 1, m11: 4, m12: 7,
			m20: 2, m21: 5, m22: 8
		}, Matrix3x3.equal);
	};

	runner.testCases.transposeMatrix = () => {
		Assert.equalBy(Matrix3x3.transpose({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}), {
			m00: 0, m01: 3, m02: 6,
			m10: 1, m11: 4, m12: 7,
			m20: 2, m21: 5, m22: 8
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.transpose({
			m00: 0, m01: 3, m02: 6,
			m10: 1, m11: 4, m12: 7,
			m20: 2, m21: 5, m22: 8
		}), {
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, Matrix3x3.equal);
	};

	runner.testCases.matrixToArray = () => {
		Assert.equalBy(Matrix3x3.toArray({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}), [
			0, 1, 2,
			3, 4, 5,
			6, 7, 8
		], (a, b) => ArrayUtils.arrayEqualBy(a, b, (c, d) => c == d));
		Assert.equalBy(Matrix3x3.toArray({
			m00: 0, m01: 3, m02: 6,
			m10: 1, m11: 4, m12: 7,
			m20: 2, m21: 5, m22: 8
		}), [
			0, 3, 6,
			1, 4, 7,
			2, 5, 8
		], (a, b) => ArrayUtils.arrayEqualBy(a, b, (c, d) => c == d));
	};

	runner.testCases.mulMatrix = () => {
		Assert.equalBy(Matrix3x3.mul({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, 2), {
			m00: 0, m01: 2, m02: 4,
			m10: 6, m11: 8, m12: 10,
			m20: 12, m21: 14, m22: 16
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.mul({
			m00: 0, m01: 3, m02: 6,
			m10: 1, m11: 4, m12: 7,
			m20: 2, m21: 5, m22: 8
		}, -2), {
			m00: 0, m01: -6, m02: -12,
			m10: -2, m11: -8, m12: -14,
			m20: -4, m21: -10, m22: -16
		}, Matrix3x3.equal);
	};

	runner.testCases.composeMatrix = () => {
		Assert.equalBy(Matrix3x3.compose({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, {
			m00: 0, m01: 3, m02: 6,
			m10: 1, m11: 4, m12: 7,
			m20: 2, m21: 5, m22: 8
		}), {
			m00: 5, m01: 14, m02: 23,
			m10: 14, m11: 50, m12: 86,
			m20: 23, m21: 86, m22: 149
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.compose({
			m00: 0, m01: 1, m02: 2,
			m10: 3, m11: 4, m12: 5,
			m20: 6, m21: 7, m22: 8
		}, {
			m00: 5, m01: 7, m02: 1,
			m10: 4, m11: 3, m12: 6,
			m20: 2, m21: 8, m22: 0
		}), {
			m00: 8, m01: 19, m02: 6,
			m10: 41, m11: 73, m12: 27,
			m20: 74, m21: 127, m22: 48
		}, Matrix3x3.equal);
	};

	runner.testCases.rotateWithXMatrix = () => {
		const sqrt1_2 = Math.SQRT1_2;
		Assert.equalBy(Matrix3x3.rotateWithX(Angle.rad(0)), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.rotateWithX(Angle.rad(Math.PI / 4)), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: sqrt1_2, m12: sqrt1_2,
			m20: 0, m21: -sqrt1_2, m22: sqrt1_2
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.rotateWithX(Angle.rad(Math.PI)), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: -1, m12: 0,
			m20: 0, m21: 0, m22: -1
		}, Matrix3x3.equal);
	};

	runner.testCases.rotateWithYMatrix = () => {
		const sqrt1_2 = Math.SQRT1_2;
		Assert.equalBy(Matrix3x3.rotateWithY(Angle.rad(0)), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.rotateWithY(Angle.rad(Math.PI / 4)), {
			m00: sqrt1_2, m01: 0, m02: -sqrt1_2,
			m10: 0, m11: 1, m12: 0,
			m20: sqrt1_2, m21: 0, m22: sqrt1_2
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.rotateWithY(Angle.rad(Math.PI)), {
			m00: -1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: -1
		}, Matrix3x3.equal);
	};

	runner.testCases.rotateWithZMatrix = () => {
		const sqrt1_2 = Math.SQRT1_2;
		Assert.equalBy(Matrix3x3.rotateWithZ(Angle.rad(0)), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.rotateWithZ(Angle.rad(Math.PI / 4)), {
			m00: sqrt1_2, m01: sqrt1_2, m02: 0,
			m10: -sqrt1_2, m11: sqrt1_2, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.rotateWithZ(Angle.rad(Math.PI)), {
			m00: -1, m01: 0, m02: 0,
			m10: 0, m11: -1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
	};

	runner.testCases.rotateMatrix = () => {
		const sqrt1_2 = Math.SQRT1_2;
		Assert.equalBy(Matrix3x3.rotate({ x: 1, y: 0, z: 0 }, Angle.rad(0)), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.rotate({ x: 0, y: 1, z: 0 }, Angle.rad(Math.PI / 4)), {
			m00: sqrt1_2, m01: 0, m02: -sqrt1_2,
			m10: 0, m11: 1, m12: 0,
			m20: sqrt1_2, m21: 0, m22: sqrt1_2
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.rotate({ x: 0, y: 0, z: 1 }, Angle.rad(Math.PI)), {
			m00: -1, m01: 0, m02: 0,
			m10: 0, m11: -1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
	};

	runner.testCases.scaleWithXMatrix = () => {
		Assert.equalBy(Matrix3x3.scaleWithX(2), {
			m00: 2, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.scaleWithX(5), {
			m00: 5, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.scaleWithX(-10), {
			m00: -10, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
	};

	runner.testCases.scaleWithYMatrix = () => {
		Assert.equalBy(Matrix3x3.scaleWithY(2), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 2, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.scaleWithY(5), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 5, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.scaleWithY(-10), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: -10, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
	};

	runner.testCases.scaleWithZMatrix = () => {
		Assert.equalBy(Matrix3x3.scaleWithZ(2), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 2
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.scaleWithZ(5), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 5
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.scaleWithZ(-10), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: -10
		}, Matrix3x3.equal);
	};

	runner.testCases.scaleMatrix = () => {
		Assert.equalBy(Matrix3x3.scale({ x: 1, y: 0, z: 0 }, 2), {
			m00: 2, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.scale({ x: 0, y: 1, z: 0 }, 5), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 5, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.scale({ x: 0, y: 0, z: 1 }, -10), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: -10
		}, Matrix3x3.equal);
	};

	runner.testCases.projectionToXYMatrix = () => {
		Assert.equalBy(Matrix3x3.projectionToXY(), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 0
		}, Matrix3x3.equal);
	};

	runner.testCases.projectionToYZMatrix = () => {
		Assert.equalBy(Matrix3x3.projectionToYZ(), {
			m00: 0, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
	};

	runner.testCases.projectionToXZMatrix = () => {
		Assert.equalBy(Matrix3x3.projectionToXZ(), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 0, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
	};

	runner.testCases.projectionMatrix = () => {
		Assert.equalBy(Matrix3x3.projection({ x: 1, y: 0, z: 0 }), {
			m00: 0, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.projection({ x: 0, y: 1, z: 0 }), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 0, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.projection({ x: 0, y: 0, z: 1 }), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 0
		}, Matrix3x3.equal);
	};

	runner.testCases.reflectionMatrix = () => {
		Assert.equalBy(Matrix3x3.reflection({ x: 1, y: 0, z: 0 }), {
			m00: -1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.reflection({ x: 0, y: 0, z: 1 }), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: -1
		}, Matrix3x3.equal);
	};

	runner.testCases.shearWithXYMatrix = () => {
		Assert.equalBy(Matrix3x3.shearWithXY(2, 3), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: 2, m21: 3, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.shearWithXY(-5, 5), {
			m00: 1, m01: 0, m02: 0,
			m10: 0, m11: 1, m12: 0,
			m20: -5, m21: 5, m22: 1
		}, Matrix3x3.equal);
	};

	runner.testCases.shearWithYZMatrix = () => {
		Assert.equalBy(Matrix3x3.shearWithYZ(2, 3), {
			m00: 1, m01: 2, m02: 3,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.shearWithYZ(-5, 5), {
			m00: 1, m01: -5, m02: 5,
			m10: 0, m11: 1, m12: 0,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
	};

	runner.testCases.shearWithXZMatrix = () => {
		Assert.equalBy(Matrix3x3.shearWithXZ(2, 3), {
			m00: 1, m01: 0, m02: 0,
			m10: 2, m11: 1, m12: 3,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
		Assert.equalBy(Matrix3x3.shearWithXZ(-5, 5), {
			m00: 1, m01: 0, m02: 0,
			m10: -5, m11: 1, m12: 5,
			m20: 0, m21: 0, m22: 1
		}, Matrix3x3.equal);
	};
}