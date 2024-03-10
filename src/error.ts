import {HttpException, HttpStatus} from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(message: string, statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message, statusCode);
  }
}
