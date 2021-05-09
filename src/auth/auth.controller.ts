// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthenticationService } from './auth.service';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getCurrentUser(@Req() request: RequestWithUser) {
    return this.authenticationService.getCurrentUser(request);
  }

  @Post('register')
  async register(
    @Body() registrationData: RegisterDto,
    @Res() response: Response,
  ) {
    return this.authenticationService.register(registrationData, response);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    return this.authenticationService.login(request, response);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser, @Res() response: Response) {
    return this.authenticationService.logout(request, response);
  }
}
