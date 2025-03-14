import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto): Promise<{ accessToken: string }> {
    return this.authService.signUp(data);
  }

  @Post('sign-in')
  async signIn(@Body() data: SignInDto): Promise<{ access_token: string }> {
    return this.authService.signIn(data);
  }
}
