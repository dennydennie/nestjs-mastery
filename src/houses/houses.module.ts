import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Address from 'src/houses/entities/address.entity';
import User from 'src/users/entities/user.entity';
import House from './entities/house.entity';
import Photo from './entities/photo.entity';
import { HousesPhotoService } from './houses-photo.service';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';

@Module({
  imports: [TypeOrmModule.forFeature([House, User, Address, Photo])],
  controllers: [HousesController],
  providers: [HousesService, HousesPhotoService],
})
export class HousesModule {}
