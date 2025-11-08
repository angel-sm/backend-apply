import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiSignin } from '../../swagger/auth/auth.controller.swagger';
import { AuthService } from './auth.service';
import { SigninDto } from './signin.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiSignin()
  async searchSkus(@Body() { username }: SigninDto) {
    const { accessToken } = await this.authService.signIn(username);
    return {
      success: true,
      accessToken,
    };
  }
}
