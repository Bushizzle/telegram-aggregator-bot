import { CHANNELS } from '../../constants';
import { runCollector } from './collectorApp';

void runCollector(CHANNELS, '../../../.env.local');
