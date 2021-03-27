import { Maybe } from './lib/maybe';
import { Canvas, Color } from './canvas';
import { Vector3 } from './lib/vector3';
import { Matrix3x3 } from './lib/matrix3x3';
import { Angle } from './lib/angle';

const initialize = (): Maybe.Maybe<CanvasRenderingContext2D> => {
	return Maybe.wrap(document.getElementById('canvas') as HTMLCanvasElement | undefined).map(elm => elm.getContext('2d'));
};

const main = () => {
	const ctx = initialize().throwableGet();
	const canvas = new Canvas(ctx);

	const vec = Vector3.vec;
	let cube: [Vector3.Vec, Vector3.Vec][] = [
		[vec(-100, -100, 100), vec(100, -100, 100)],
		[vec(100, -100, 100), vec(100, 100, 100)],
		[vec(100, 100, 100), vec(-100, 100, 100)],
		[vec(-100, 100, 100), vec(-100, -100, 100)],
		[vec(-100, -100, -100), vec(100, -100, -100)],
		[vec(100, -100, -100), vec(100, 100, -100)],
		[vec(100, 100, -100), vec(-100, 100, -100)],
		[vec(-100, 100, -100), vec(-100, -100, -100)],
		[vec(-100, -100, 100), vec(-100, -100, -100)],
		[vec(100, -100, 100), vec(100, -100, -100)],
		[vec(100, 100, 100), vec(100, 100, -100)],
		[vec(-100, 100, 100), vec(-100, 100, -100)],
	];

	const rad = Angle.rad;
	const conv = Vector3.convert;
	const projXY = Matrix3x3.projectionToXY;
	const rotateX = Matrix3x3.rotateWithX;
	const rotateY = Matrix3x3.rotateWithY;
	const scaleX = Matrix3x3.scaleWithX;

	const draw = () => {
		canvas.fill(Color.Black);
		const cx = canvas.width / 2;
		const cy = canvas.height / 2;
		const lines = cube.map(([a, b]) => [conv(a, projXY()), conv(b, projXY())]);
		lines.forEach(([a, b]) => canvas.drawLine(a.x + cx, a.y + cy, b.x + cx, b.y + cy, Color.Red, { overflow: 'none' }));
		cube = cube.map(([a, b]) => [conv(a, rotateY(rad(Math.PI / 64))), conv(b, rotateY(rad(Math.PI / 64)))] as [Vector3.Vec, Vector3.Vec]);
		cube = cube.map(([a, b]) => [conv(a, rotateX(rad(Math.PI / 128))), conv(b, rotateX(rad(Math.PI / 128)))] as [Vector3.Vec, Vector3.Vec]);
		canvas.flip();
	}

	canvas.start(draw);

	const stopBtn = document.getElementById('stop-btn');
	stopBtn?.addEventListener('click', () => canvas.stop());
}

main();
