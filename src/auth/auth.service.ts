import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(username: string): Promise<{ accessToken: string }> {
    const payload = { sub: uuidv4(), username: username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
