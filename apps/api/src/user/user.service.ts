import {
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
