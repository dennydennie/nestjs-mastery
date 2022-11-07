import { Module } from '@nestjs/common';
import { EmailConfirmationGuard } from './confirm-email.guard';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local.guard';

@Module({
  providers: [LocalAuthGuard, EmailConfirmationGuard, JwtAuthGuard],
  exports: [LocalAuthGuard, EmailConfirmationGuard, JwtAuthGuard],
})
export class GuardsModule {}
