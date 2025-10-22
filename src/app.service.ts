import { Injectable } from '@nestjs/common';

import { DESCRIPTION, TITLE, VERSION } from './app.constants';

@Injectable()
export class AppService {
  read() {
    return {
      title: TITLE,
      description: DESCRIPTION,
      version: VERSION,
    };
  }
}
