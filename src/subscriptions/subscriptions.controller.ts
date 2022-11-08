import {
  Body, Controller, Delete, Get, Param, Patch, Post, Req
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a subscription',
  })
  create(
    @Req() request: RequestWithUser,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionsService.create(
      request.user,
      createSubscriptionDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Find all subscriptions',
  })
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find one subscription by id',
  })
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a subscription by id',
  })


  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one subscription by id',
  })
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(id);
  }
}
