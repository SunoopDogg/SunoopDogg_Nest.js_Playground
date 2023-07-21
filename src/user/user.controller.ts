import { Body, Controller, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';

@Crud({
  model: {
    type: User,
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }
}
