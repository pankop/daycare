import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateNannyDto } from '../nanny/dtos/create-nanny.dto';
import { CreateHospitalityDto } from '../hospitality/dtos/create-hospitality.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/curent-user.decorator';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('nanny/login')
  async loginNanny(@Body() body) {
    const user = await this.authService.validateUser(
      'nanny',
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user, 'nanny');
  }

  @Post('nanny/register')
  async registerNanny(@Body() createNannyDto: CreateNannyDto) {
    return this.authService.register(createNannyDto, 'nanny');
  }

  @Post('parent/login')
  async loginParent(@Body() body) {
    const user = await this.authService.validateUser(
      'parent',
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user, 'parent');
  }

  // @Post('parent/register')
  // async registerParent(@Body() createParentDto: CreateParentDto) {
  //   return this.authService.register(createParentDto, 'parent');
  // }

  @Post('hospitality/login')
  async loginHospitality(@Body() body) {
    const user = await this.authService.validateUser(
      'hospitality',
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user, 'hospitality');
  }

  @Post('hospitality/register')
  async registerHospitality(
    @Body() createHospitalityDto: CreateHospitalityDto,
  ) {
    return this.authService.register(createHospitalityDto, 'hospitality');
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user) {
    return user;
  }
}
