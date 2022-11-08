/// <reference types="multer" />
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { CreateHouseDto } from './dto/create-house.dto';
import HouseDto from './dto/house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HousesService } from './houses.service';
export declare class HousesController {
    private readonly housesService;
    constructor(housesService: HousesService);
    create(house: CreateHouseDto, req: RequestWithUser): Promise<any>;
    findAll(): Promise<HouseDto[]>;
    findOne(id: string): Promise<House>;
    update(id: string, updateHouseDto: UpdateHouseDto): Promise<House>;
    remove(id: string): Promise<void>;
    addPhoto(id: string, file: Express.Multer.File): Promise<any>;
}
