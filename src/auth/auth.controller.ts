import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { Public, User } from 'src/decorator/customize';
import { Response, Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { IUser } from 'src/users/users.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(email, password, response);
  }


  @Get('refresh')
  refreshTokens(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies["refresh_token"];
    return this.authService.precessNewToken(refreshToken, response);
  }
}
