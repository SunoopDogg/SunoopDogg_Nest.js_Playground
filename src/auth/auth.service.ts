import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';

import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(singInDto: SignInDto) {
    const user = await this.userService.findOne({
      where: { email: singInDto.email },
    });

    if (user && (await bcrypt.compare(singInDto.password, user.password))) {
      const { password, ...result } = user;
      password;
      return result;
    }

    return null;
  }
}
