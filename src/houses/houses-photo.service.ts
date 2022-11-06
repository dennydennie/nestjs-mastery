import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';

@Injectable()
export class HousesPhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async uploadPhoto(dataBuffer: Buffer, filename: string) {
    const newPhoto = await this.photoRepository.create({
      filename,
      data: dataBuffer,
    });
    const uploadedPhoto = await this.photoRepository.save(newPhoto);
    return uploadedPhoto;
  }

  async getPhotoById(photoId: string) {
    const photo = await this.photoRepository.findOneBy({ id: photoId });
    if (!photo) {
      throw new NotFoundException();
    }
    return photo;
  }

  findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }
}
