import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req) {
    const userId = req.user.id;
    const user = await this.userService.getUserById(userId as string);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
