import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
    }

    async create(data: { name: string, email: string, password: string }) {
        const userData = this.userRepository.create(data)
        return this.userRepository.save(userData);
    }

    async findAll() {
        return this.userRepository.find();
    }

    async findOne(id: number) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email }
        });
    }

    // async update(params: {
    //     id: number;
    //     data: Prisma.UsersUpdateInput;
    // }) {
    //     const { id, data } = params;
    //     return this.prisma.users.update({ where: { id }, data });
    // }
}
