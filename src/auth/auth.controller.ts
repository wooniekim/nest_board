import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: '로그인 API',
    description: '사용자가 로컬 로그인을 합니다.',
  })
  @ApiBody({})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() req) {
    const user = req?.user;

    console.log('user : ', user);

    return this.authService.logIn(user);
  }
}
