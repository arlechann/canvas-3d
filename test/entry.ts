import { runner } from './lib/runner';
import { vecTest } from './vector';
import { canvasTest } from './canvas';

vecTest(runner);
canvasTest(runner);

runner.run();