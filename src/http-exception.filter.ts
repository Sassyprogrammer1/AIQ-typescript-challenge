import {Inject, Logger} from '@nestjs/common';
import {ExceptionFilter, Catch, ArgumentsHost, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';
import {CustomError} from './error';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject('Logger')
    private readonly logger: Logger,
  ) {}
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (error instanceof CustomError) {
      this.logger.error(error);
      status = 404;
      message = error.message;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
