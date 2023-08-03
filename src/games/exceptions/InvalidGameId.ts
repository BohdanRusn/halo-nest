import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidGameIdException extends HttpException {
  constructor() {
    super('Invalid Game Id', HttpStatus.BAD_REQUEST);
  }
}
