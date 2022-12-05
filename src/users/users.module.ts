import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmailModule from 'src/email/email.module';
import House from 'src/houses/entities/house.entity';
import { SmsModule } from 'src/sms/sms.module';
import User from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, House]),
    ConfigModule,
    EmailModule,
    JwtModule,
    SmsModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
