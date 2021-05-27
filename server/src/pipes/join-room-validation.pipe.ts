import { Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import joi from 'joi';

@Injectable()
export class JoinRoomValidationPipe implements PipeTransform {
  transform(value: any) {
    const schema = joi.object({
      password: joi.string(),
      roomId: joi.string().length(32).required(),
      name: joi.string().required(),
    });

    const { error } = schema.validate(value);
    if (error) throw new WsException({ message: error.message });
    return value;
  }
}
