import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateGameException extends HttpException {
  constructor(msg?: string) {
    const defaultMessage = 'Create Game Exception';
    super(
      msg ? defaultMessage.concat(`:${msg}`) : defaultMessage,
      HttpStatus.BAD_REQUEST,
    );
  }
}
