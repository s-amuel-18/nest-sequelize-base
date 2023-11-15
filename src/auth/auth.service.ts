import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Login } from './interfaces/login.interface';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './interfaces/auth-response.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly jwrService: JwtService,
  ) {}

  async validUser(id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!bcrypt.compareSync(loginDto.password, user.password))
      throw new BadRequestException('Credenciales incorrectas.');

    const token = this.generateToken(user.id);

    return { token, user };
  }

  generateToken(userId: number): string {
    const payload = { id: userId };
    return this.jwrService.sign(payload);
  }

  async revalidateToken(token): Promise<string> {
    try {
      const payload = await this.jwrService.verifyAsync(token);

      if (!payload) return null;
      const { id } = payload;

      // const user = await this.userService.findOne(id, {
      //   throwException: false,
      // });

      return this.generateToken(id);
    } catch (error) {
      return null;
    }
  }
}
