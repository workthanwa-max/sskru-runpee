import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RegisterInput } from './dto/auth.dto';
import { IdentityService } from './services/identity.service';

@Controller('auth')
export class AuthRestController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.identityService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterInput) {
    return this.identityService.register(body);
  }

  @Get('profile')
  @UseGuards(LocalAuthGuard)
  getProfile(@Request() req: any) {
    return this.identityService.findOne(req.user.id);
  }
}
