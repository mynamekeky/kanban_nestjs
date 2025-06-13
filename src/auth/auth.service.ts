import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ResponseLoginDto, ResponseUserDto } from './dto/response.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseMessageDto } from 'src/base/base.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
  }

  async login(email: string, password: string): Promise<ResponseLoginDto> {
    const user = await this.userRepository.findOne({
      where: { email }
    });

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
    try {
      const userData = await this.userRepository.create(data)
      await this.userRepository.save(userData);
      return {
        message: 'Create User Success',
      };
    } catch (err) {
      return {
        message: 'error',
      };
    }

  }

  async getProfile(userId: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new InternalServerErrorException()
    }

    return user;
  }
}
