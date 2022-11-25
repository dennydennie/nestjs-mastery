/// <reference types="node" />
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import House from './entities/house.entity';
import { HousesPhotoService } from './houses-photo.service';
export declare class HousesService {
    private housesRepository;
    private housesPhotoService;
    constructor(housesRepository: Repository<House>, housesPhotoService: HousesPhotoService);
    create(house: CreateHouseDto, user: User): Promise<House>;
    findAll(): Promise<House[]>;
    findOneById(id: string): Promise<House>;
    update(id: string, updateHouse: UpdateHouseDto): Promise<House>;
    remove(id: string): Promise<void>;
    addPhoto(houseId: string, imageBuffer: Buffer, filename: string): Promise<import("./entities/photo.entity").default>;
    getPhotoById(PhotoId: string): Promise<import("./entities/photo.entity").default>;
}
