export type RGBA = [number, number, number, number];

export const Color = {
	Black: [0, 0, 0, 0xff] as RGBA,
	White: [0xff, 0xff, 0xff, 0xff] as RGBA,
	Red: [0xff, 0, 0, 0xff] as RGBA,
	Green: [0, 0xff, 0, 0xff] as RGBA,
	Blue: [0, 0, 0xff, 0xff] as RGBA,
	Yellow: [0xff, 0xff, 0, 0xff] as RGBA,
	Cyan: [0, 0xff, 0xff, 0xff] as RGBA,
	Purple: [0xff, 0, 0xff, 0xff] as RGBA,
};

// ブレゼンハムのアルゴリズム
// https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AC%E3%82%BC%E3%83%B3%E3%83%8F%E3%83%A0%E3%81%AE%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0
export const bresenham = (x1: number, y1: number, x2: number, y2: number): [number, number][] => {
	const dx = Math.abs(x2 - x1);
	const dy = Math.abs(y2 - y1);
	const sx = x1 < x2 ? 1 : -1;
	const sy = y1 < y2 ? 1 : -1;

	let plots: [number, number][] = [[x1, y1]];
	let err = dx - dy;
	while (x1 !== x2 || y1 !== y2) {
		const err2 = 2 * err;
		if (err2 > -dy) {
			err -= dy;
			x1 += sx;
		}
		if (err2 < dx) {
			err += dx;
			y1 += sy;
		}
		plots.push([x1, y1]);
	}
	return plots;
}

export class Canvas {
	public readonly width: number;
	public readonly height: number;

	private context: CanvasRenderingContext2D;
	private back: ImageData;
	private handle?: number;

	constructor(
		context: CanvasRenderingContext2D
	) {
		this.width = context.canvas.width;
		this.height = context.canvas.height;
		this.context = context;
		this.back = new ImageData(this.width, this.height);
	}

	fill(rgba: RGBA): void {
		for (let i = 0; i < this.back.height * this.back.width; i++) {
			rgba.forEach((v, j) => this.back.data[i * 4 + j] = v);
		}
	}

	flip(): void {
		this.context.putImageData(this.back, 0, 0);
	}

	drawDot(x: number, y: number, rgba: RGBA): void {
		if (x < 0 || this.width <= x || y < 0 || this.height <= y) { return; }
		const index = (y * this.width + x) * 4;
		rgba.forEach((v, i) => this.back.data[index + i] = v);
	}

	drawLine(x1: number, y1: number, x2: number, y2: number, rgba: RGBA, option?: Partial<DrawLineOption>): void {
		const self = this;
		const draw = option != null && option.overflow == 'wrap'
			? (x: number, y: number): void => self.drawDot(x % this.width, y % this.height, rgba)
			: (x: number, y: number): void => self.drawDot(x, y, rgba);
		bresenham(x1, y1, x2, y2).forEach(p => draw(...p));
	}

	start(drawer: () => void): void {
		this.handle = window.setInterval(drawer, 1000 / 60);
	}

	stop(): void {
		clearInterval(this.handle);
	}
}

type Overflow = 'wrap' | 'none';
type DrawLineOption = {
	overflow: Overflow;
};