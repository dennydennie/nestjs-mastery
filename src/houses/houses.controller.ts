import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req, UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { CreateHouseDto } from './dto/create-house.dto';
import HouseDto from './dto/house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HousesService } from './houses.service';

@Controller('houses')
@ApiTags('Houses')
export class HousesController {
  constructor(
    private readonly housesService: HousesService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

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
  async findAll(@Req() req: RequestWithUser): Promise<HouseDto[]> {
    const isSubscribed = await this.subscriptionsService.check(req.user.id);

    const houseEntities = await this.housesService.findAll();

    const houses = houseEntities.map((house) =>
      HouseDto.fromModel(house, isSubscribed),
    );

    return houses;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find nne house by id',
  })
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const isSubscribed = await this.subscriptionsService.check(req.user.id);

    const houseEntity = await this.housesService.findOneById(id);

    return HouseDto.fromModel(houseEntity, isSubscribed);
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

  @Get('photo/:id')
  async getPhotoyId(
    @Param('id') id: string
  ) {
    const file = await this.housesService.getPhotoById(id);

    return file.data;
  }
}
