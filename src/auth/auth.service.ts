import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';

import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async getCurrentUser(request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  public async register(registrationData: RegisterDto, response: Response) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdUser = await this.usersService.createUser({
        email: registrationData.email,
        username: registrationData.username,
        password: hashedPassword,
      });
      const { cookie, token } = this.getCookieWithJwtToken(createdUser.id);
      createdUser.token = token;
      response.setHeader('Set-Cookie', cookie);
      return response.send(createdUser);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // This functions is protected through the auth guard which logs users in
  public async login(request: RequestWithUser, response: Response) {
    const { user } = request;
    const { cookie, token } = this.getCookieWithJwtToken(user.id);
    user.token = token;
    response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }

  public async logout(_: RequestWithUser, response: Response) {
    response.setHeader('Set-Cookie', this.getCookieForLogOut());
    return response.sendStatus(200);
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
    return { cookie, token };
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
