import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './services/faculty.service';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [FacultyController],
  providers: [FacultyService],
  exports: [FacultyService],
})
export class FacultyModule {}
