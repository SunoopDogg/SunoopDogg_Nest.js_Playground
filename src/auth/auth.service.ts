import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';

import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(singInDto: SignInDto) {
    const user = await this.userService.findOne({
      where: { email: singInDto.email },
    });

    if (user && (await bcrypt.compare(singInDto.password, user.password))) {
      const payload = { email: user.email, sub: user.id };

      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    return null;
  }
}
