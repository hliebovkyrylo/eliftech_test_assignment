import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { createAccessToken } from 'src/utils/token.util';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(data: SignUpDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 8);

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      const accessToken = createAccessToken(user.id);

      return { accessToken };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async signIn(data: SignInDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isCorrectPassword = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!isCorrectPassword) {
        throw new BadRequestException('Invalid data provided');
      }

      const access_token = createAccessToken(user.id);

      return { access_token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
