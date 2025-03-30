import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    coSerialNo: string,
    coCertificateNo: string,
  ): Promise<any> {
    const user = await this.usersService.findByCertificates(
      coSerialNo,
      coCertificateNo,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    const payload = {
      sub: user._id,
      coSerialNo: user.coSerialNo,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
