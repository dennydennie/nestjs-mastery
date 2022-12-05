/// <reference types="multer" />
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { CreateHouseDto } from './dto/create-house.dto';
import HouseDto from './dto/house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HousesService } from './houses.service';
export declare class HousesController {
    private readonly housesService;
    private readonly subscriptionsService;
    constructor(housesService: HousesService, subscriptionsService: SubscriptionsService);
    create(house: CreateHouseDto, req: RequestWithUser): Promise<import("./entities/house.entity").default>;
    findAll(req: RequestWithUser): Promise<HouseDto[]>;
    findOne(id: string, req: RequestWithUser): Promise<HouseDto>;
    update(id: string, updateHouseDto: UpdateHouseDto): Promise<import("./entities/house.entity").default>;
    remove(id: string): Promise<void>;
    addPhoto(id: string, file: Express.Multer.File): Promise<import("./entities/photo.entity").default>;
    getPhotoyId(id: string): Promise<Uint8Array>;
}
