import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from './typeorm/entities/User';
import { AuthModule } from './auth/auth.module';

const port = Number(process.env.DATABASE_PORT || 5432);

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: port,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User],
    synchronize: true,

  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
