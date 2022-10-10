import { CHANNELS } from './constants';
import { runClient } from './client';
import { runApp } from './app';

void runApp(CHANNELS, '../.env', runClient);
