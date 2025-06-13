import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

export const jwtSecret = 'top_secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: { userId: number }) {
        const user = await this.userRepository.findOne({ where: { id: payload.userId } });
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}