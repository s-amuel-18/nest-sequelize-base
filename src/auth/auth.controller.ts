import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticación' })
  @ApiResponse({ description: 'Autentica el usuario', status: 200, type: User })
  async login(@Body() loginDto: LoginDto) {
    const { token, user } = await this.authService.login(loginDto);
    // console.log(token);
    return {
      token,
      data: { user },
      message: 'Mi mensaje',
    };
  }
}
