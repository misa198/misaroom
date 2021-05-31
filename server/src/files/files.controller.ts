import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { AppService } from 'src/app.service';
import { FilesGateway } from './files.gateway';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly appService: AppService,
    private readonly filesGateway: FilesGateway,
  ) {}

  @Post('images')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (_, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
          return cb(new BadRequestException('Invalid file type!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 3.5 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { originalname } = file;
    const paths = originalname.split('.');
    if (paths.length !== 4) throw new BadRequestException('Invalid file!');
    if (paths[0].length !== 32) throw new BadRequestException('Invalid file!');
    if (paths[1].length !== 20) throw new BadRequestException('Invalid file!');
    if (paths[2].length !== 64) throw new BadRequestException('Invalid file!');
    const { user } = await this.appService.authenticate(paths[1], paths[0]);
    try {
      const url = (await this.filesService.uploadImage(
        file.buffer,
        paths[0],
      )) as string;
      this.filesGateway.responseImageMessage(paths[1], user, url, paths[2]);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
