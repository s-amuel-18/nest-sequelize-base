import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { OptionsService } from 'src/common/interfaces/options-service.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    private readonly authService: AuthService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number, options: OptionsService = {}) {
    const user = await this.userModel.findByPk(id);

    if (user) return user;

    if (options.throwException)
      throw new NotFoundException('Usuario no encontrado.');
    else return null;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
