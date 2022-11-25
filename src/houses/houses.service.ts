import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import House from './entities/house.entity';
import { HousesPhotoService } from './houses-photo.service';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House)
    private housesRepository: Repository<House>,
    private housesPhotoService: HousesPhotoService,
  ) {}
  create(house: CreateHouseDto, user: User) {
    const newHouse = this.housesRepository.create({ ...house, owner: user });
    if (newHouse) {
      return this.housesRepository.save(newHouse);
    }
    throw new HttpException(
      'Failed to create new house',
      HttpStatus.BAD_REQUEST,
    );
  }

  findAll(): Promise<House[]> {
    return this.housesRepository.find();
  }

  async findOneById(id: string) {
    const house = await this.housesRepository.findOneBy({ id });
    if (house) {
      return house;
    }
    throw new HttpException('House not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateHouse: UpdateHouseDto) {
    await this.housesRepository.update(id, updateHouse);
    const updatedHouse = await this.housesRepository.findOneBy({ id });
    if (updatedHouse) {
      return updatedHouse;
    }
    throw new HttpException('House not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    const deleteResponse = await this.housesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('House not found', HttpStatus.NOT_FOUND);
    }
  }

  async addPhoto(houseId: string, imageBuffer: Buffer, filename: string) {
    const photo = await this.housesPhotoService.uploadPhoto(
      imageBuffer,
      filename,
    );
    await this.housesRepository.update(houseId, {
      photo: photo,
    });
    return photo;
  }

  async getPhotoById(PhotoId: string) {
    const file = await this.housesPhotoService.getPhotoById(PhotoId);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
