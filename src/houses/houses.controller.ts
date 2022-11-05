import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  create(@Body() house: CreateHouseDto, @Req() req: RequestWithUser) {
    return this.housesService.create(house, req.user);
  }
  @Get()
  findAll() {
    return this.housesService.findAll();
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
