import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body) {
    const email = body?.email;
    const password = body?.password;
    const nickname = body?.nickname;
    const tel = body?.tel;

    return this.userService.register(email, password, nickname, tel);
  }
  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  async getUserInfo() {
    return 'user-info Page';
  }

  //   @UseGuards(LoggedInGuard)
  //   @Get()
  //   async getUserInfo(@User() user) {
  //     return user;
  //   }
}
