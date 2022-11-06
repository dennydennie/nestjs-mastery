import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { CreateHouseDto } from './dto/create-house.dto';
import HouseDto from './dto/house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HousesService } from './houses.service';

@Controller('houses')
@ApiTags('Houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a house',
  })
  create(@Body() house: CreateHouseDto, @Req() req: RequestWithUser) {
    return this.housesService.create(house, req.user);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all houses',
  })
  async findAll(): Promise<HouseDto[]> {
    const houseEntities = await this.housesService.findAll();

    const houses = houseEntities.map((house) => HouseDto.fromModel(house));

    return houses;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find nne house by id',
  })
  findOne(@Param('id') id: string) {
    return this.housesService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a house',
  })
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.housesService.update(id, updateHouseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a house by id',
  })
  remove(@Param('id') id: string) {
    return this.housesService.remove(id);
  }

  @Post('photo/:id')
  @ApiOperation({
    summary: 'Upload one photo for each house',
  })
  @UseInterceptors(FileInterceptor('file'))
  async addPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.housesService.addPhoto(id, file.buffer, file.originalname);
  }
}
