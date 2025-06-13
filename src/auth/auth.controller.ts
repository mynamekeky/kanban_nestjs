import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseLoginDto, ResponseUserDto } from './dto/response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResponseMessageDto, SwaggerError } from 'src/base/base.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'login' })
  @ApiOkResponse({ description: 'success', type: ResponseLoginDto })
  @ApiInternalServerErrorResponse({
    type: SwaggerError,
    description: 'Internal Server',
  })
  @ApiBadRequestResponse({
    type: SwaggerError,
    description: 'Bad Request'
  })
  @ApiUnauthorizedResponse({
    type: SwaggerError,
    description: 'Unauthorize',
  })
  @ApiNotFoundResponse({
    type: SwaggerError,
    description: 'Not Found',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseLoginDto> {
    return await this.authService.login(loginDto.email, loginDto.password)
  }

  @ApiOperation({ summary: 'register' })
  @ApiOkResponse({ description: 'Success', type: SwaggerError })
  @ApiInternalServerErrorResponse({
    type: SwaggerError,
    description: 'Internal Server',
  })
  @ApiBadRequestResponse({
    type: SwaggerError,
    description: 'Bad Request'
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ResponseMessageDto> {
    return await this.authService.register(registerDto)
  }

  @ApiOperation({ summary: 'get profile' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Success', type: ResponseUserDto })
  @ApiUnauthorizedResponse({
    type: SwaggerError,
    description: 'Unauthorize',
  })
  @ApiNotFoundResponse({
    type: SwaggerError,
    description: 'Not Found',
  })
  @ApiInternalServerErrorResponse({
    type: SwaggerError,
    description: 'Internal Server',
  })
  @Get('getProfile')
  async getProfile(@Req() req): Promise<ResponseUserDto> {
    return await this.authService.getProfile(req.user.id)
  }
}
