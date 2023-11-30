import {
  ExecutionContext,
  InternalServerErrorException,
  Logger,
  createParamDecorator,
} from '@nestjs/common';
import { error } from 'console';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const logger = new Logger('GetUser');
  const req = ctx.switchToHttp().getRequest();
  const { user } = req;

  if (!user) {
    logger.error("No existe usuario en la 'request'");
    throw new InternalServerErrorException();
  }

  return user;
});
