import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayloadDto } from './dto/jwt-payload.dto';

import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      password;
      return result;
    }
    return null;
  }

  async signIn(user: any) {
    const payload: JwtPayloadDto = {
      email: user.email,
      sub: user.id,
      username: user.name,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
