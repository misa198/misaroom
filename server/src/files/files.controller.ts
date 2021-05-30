import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

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
    const url = await this.filesService.uploadImage(file.buffer, paths[0]);
    console.log(url);
  }
}
