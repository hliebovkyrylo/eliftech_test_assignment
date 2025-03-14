import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '../../utils/token.util';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

export class AuthGuard implements CanActivate {
  constructor(@Inject(UserService) private userService: UserService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;

    if (!accessToken) {
      throw new UnauthorizedException('Access token not provided');
    }

    try {
      const token = accessToken.startsWith('Bearer ')
        ? accessToken.slice(7)
        : accessToken;

      const id = verifyToken(token);
      const user = await this.userService.getUserById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Access token has expired');
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Access token is not valid');
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid authentication');
    }
  }
}
