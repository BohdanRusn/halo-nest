import { HttpException, HttpStatus } from '@nestjs/common';

export class GameExistsException extends HttpException {
  constructor() {
    super('Game Already Exists', HttpStatus.CONFLICT);
  }
}
