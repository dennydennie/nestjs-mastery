import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
export declare class HousesService {
    private housesRepository;
    constructor(housesRepository: Repository<House>);
    create(house: CreateHouseDto, user: User): Promise<House>;
    findAll(): Promise<House[]>;
    findOneById(id: string): Promise<House>;
    update(id: string, updateHouse: UpdateHouseDto): Promise<House>;
    remove(id: string): Promise<void>;
}
