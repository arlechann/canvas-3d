import { runner } from './lib/runner';
import { vecTest } from './vector';
import { canvasTest } from './canvas';
import { matrixTest } from './matrix';

vecTest(runner);
canvasTest(runner);
matrixTest(runner);

runner.run();