import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Crea un usuario',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista de usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
  @UseGuards(AuthGuard())
  async findAll() {
    return {
      data: { users: await this.userService.findAll() },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuario por id' })
  @ApiResponse({
    status: 200,
    description: 'Buscar usuario por id',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza usuario por id' })
  @ApiResponse({
    status: 200,
    description: 'Actualiza usuario por id',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina usuario por id' })
  @ApiResponse({
    status: 200,
    description: 'Elimina usuario por id',
    type: User,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
