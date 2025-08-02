import Logger from '../config/Logger';

const filename: string | undefined = process.argv[2];

if (!filename) {
  Logger.error('Filename is required');
  process.exit(1);
}

import(`./${filename}`);
