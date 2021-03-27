import { runner } from './lib/runner';
import { vecTest } from './vector3';
import { canvasTest } from './canvas';
import { matrixTest } from './matrix3x3';

vecTest(runner);
canvasTest(runner);
matrixTest(runner);

runner.run();