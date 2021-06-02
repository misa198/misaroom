import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  @Get('/')
  public async get(@Res() res: Response) {
    res.sendFile(path.resolve(`${__dirname}/../build/index.html`));
  }
}
