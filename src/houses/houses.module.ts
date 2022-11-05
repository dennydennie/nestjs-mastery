import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/addresses/entities/addresses.entity';
import User from 'src/users/entities/user.entity';
import { House } from './entities/house.entity';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';

@Module({
  imports: [TypeOrmModule.forFeature([House, User, Address])],
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}
