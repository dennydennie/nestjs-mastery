import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigService],
  providers: [EmailService],
  exports: [EmailService],
})
export default class EmailModule {}
