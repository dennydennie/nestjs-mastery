/// <reference types="node" />
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
export declare class HousesPhotoService {
    private photoRepository;
    constructor(photoRepository: Repository<Photo>);
    uploadPhoto(dataBuffer: Buffer, filename: string): Promise<Photo>;
    getPhotoById(photoId: string): Promise<Photo>;
    findAll(): Promise<Photo[]>;
}
