import {
  Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtAuthGuard from 'src/auth/strategies/jwt/jwtAuthGuard.guard';
import { CreateHouseDto } from './dto/create-house.dto';
import HouseDto from './dto/house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HousesService } from './houses.service';

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
    const houseEntities = await this.housesService.findAll();

    const houses = houseEntities.map((house) => HouseDto.fromModel(house));

    return houses;
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

  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.housesService.addPhoto(id, file.buffer, file.originalname);
  }
}
