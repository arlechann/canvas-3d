import { Maybe } from './lib/maybe';
import { Canvas, Color } from './canvas';

const initialize = (): Maybe.Maybe<CanvasRenderingContext2D> => {
	return Maybe.wrap(document.getElementById('canvas') as HTMLCanvasElement | undefined).map(elm => elm.getContext('2d'));
};

const main = () => {
	const ctx = initialize().throwableGet();
	const canvas = new Canvas(ctx);

	let count = 0;
	const drawer = () => {
		canvas.fill(Color.Black);
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				canvas.drawDot((count + j) % canvas.width, canvas.height / 2 + i, Color.Cyan);
			}
		}
		const x = count % canvas.width;
		canvas.drawLine(x, 10, x + 200, 310, Color.Red, { overflow: 'wrap' });
		canvas.flip();
		count += 2;
	}
	canvas.start(drawer);
}

main();
