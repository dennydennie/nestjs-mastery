import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtAuthGuard from 'src/auth/strategies/jwt/jwtAuthGuard.guard';
import { ApiTags } from '@nestjs/swagger';
import HouseDto from './dto/house.dto';

@Controller('houses')
@ApiTags('Houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() house: CreateHouseDto, @Req() req: RequestWithUser) {
    return this.housesService.create(house, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<HouseDto[]> {
    const houses = await this.housesService.findAll();

    const allHouses = Promise.all(
      houses.map((house) => HouseDto.fromModel(house)),
    );

    return allHouses;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.housesService.update(id, updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housesService.remove(id);
  }
}
