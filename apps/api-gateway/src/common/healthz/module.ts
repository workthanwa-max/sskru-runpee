import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController, ReadyController } from './controller';
import { HealthService } from './service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController, ReadyController],
  providers: [HealthService],
})
export class HealthModule {}
