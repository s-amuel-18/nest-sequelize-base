import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { isArray, isString } from 'class-validator';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly authService: AuthService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const responseMsg = exception.getResponse()['message'];

    let errors = [];
    if (!!responseMsg && isArray(responseMsg)) errors = responseMsg;
    else if (isString(responseMsg)) errors = [responseMsg];

    const bearerToken = request.headers.authorization;

    const currentToken =
      !!bearerToken && bearerToken.length > 0
        ? bearerToken.split(' ')[1]
        : null;

    const revalidatedToken = await this.authService.revalidateToken(
      currentToken,
    );

    response.status(status).json({
      statusCode: status,
      message: errors.length > 0 ? errors[0] : '',
      errors,
      token: revalidatedToken,
      data: exception.getResponse()['data'] || {},
    });
  }
}
