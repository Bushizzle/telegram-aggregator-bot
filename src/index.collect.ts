import { CHANNELS } from './constants';
import { runCollector } from './_tests/collector';

void runCollector(CHANNELS, '../../../.env.local');
