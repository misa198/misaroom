import { Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import joi from 'joi';

@Injectable()
export class CreateRoomValidationPipe implements PipeTransform {
  transform(value: any) {
    const schema = joi.object({
      password: joi.string(),
    });

    const { error } = schema.validate(value);
    if (error) throw new WsException({ message: error.message });
    return value;
  }
}
