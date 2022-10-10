import { CHANNELS } from './constants';
import { runTestClient } from './_tests/client';
import { runApp } from './app';

void runApp(CHANNELS, '../.env.local', runTestClient);
