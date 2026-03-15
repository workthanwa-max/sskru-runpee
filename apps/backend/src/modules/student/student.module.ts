import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { StudentController } from './student.controller';
import { StudentService } from './services/student.service';
import { DrizzleModule } from 'src/common/drizzle/module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
