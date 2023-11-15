import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { HttpExceptionFilter } from './filters/htto-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [
    // HttpExceptionFilter,
    // ResponseInterceptor,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  imports: [AuthModule, UserModule],
})
export class CommonModule {}
