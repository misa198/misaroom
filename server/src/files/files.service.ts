import { BadRequestException, Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

@Injectable()
export class FilesService {
  uploadImage(buffer: Buffer, roomId: string) {
    return new Promise((resolve) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            folder: `misa-room/${roomId}`,
          },
          (err, result) => {
            if (err) throw new BadRequestException('Fail to upload image!');
            resolve(result.secure_url);
          },
        )
        .end(buffer);
    });
  }

  deleteFolder(roomId: string) {
    console.log(roomId);
    cloudinary.v2.api.delete_folder(`misa-room/${roomId}`);
  }
}
