import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a subscription',
  })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
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
    return this.subscriptionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a subscription by id',
  })
  update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one subscription by id',
  })
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(+id);
  }
}
