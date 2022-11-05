import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from 'src/houses/entities/house.entity';
import User from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, House])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
