import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { ResponseLoginDto, ResponseMessageDto, ResponseUserDto } from './dto/response.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string): Promise<ResponseLoginDto> {
    const user = await this.userRepository.findOneByEmail(email)

    if (!user) {
      throw new NotFoundException()
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password')
    }

    const loginDto: ResponseLoginDto = {
      accessToken: this.jwtService.sign({ userId: user.id })
    }

    return loginDto
  }

  async register(registerDto: RegisterDto): Promise<ResponseMessageDto> {

    if (registerDto.password !== registerDto.confirmPassword) {
      throw new InternalServerErrorException('Password Are Not Same')
    }

    const data = {
      name: registerDto.name,
      email: registerDto.email,
      password: await bcrypt.hash(
        registerDto.password,
        10,
      )
    }

    await this.userRepository.create(data)

    return {
      message: 'Create User Success',
    };
  }

  async getProfile(userId: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne(userId)

    if (!user) {
      throw new InternalServerErrorException()
    }

    return user;
  }
}
