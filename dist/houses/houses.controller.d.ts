/// <reference types="multer" />
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { CreateHouseDto } from './dto/create-house.dto';
import HouseDto from './dto/house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HousesService } from './houses.service';
export declare class HousesController {
    private readonly housesService;
    constructor(housesService: HousesService);
    create(house: CreateHouseDto, req: RequestWithUser): Promise<import("./entities/house.entity").default>;
    findAll(): Promise<HouseDto[]>;
    findOne(id: string): Promise<import("./entities/house.entity").default>;
    update(id: string, updateHouseDto: UpdateHouseDto): Promise<import("./entities/house.entity").default>;
    remove(id: string): Promise<void>;
    addPhoto(id: string, file: Express.Multer.File): Promise<import("./entities/photo.entity").default>;
}
