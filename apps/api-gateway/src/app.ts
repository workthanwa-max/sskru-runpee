import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from './common/observability/logger';
import { configs } from './config';
import { AuthRestModule } from './modules/auth/auth.module';
import { CurriculumRestModule } from './modules/curriculum/curriculum.module';
import { FacultyModule } from './modules/faculty/faculty.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PersonnelModule } from './modules/personnel/personnel.module';
import { RoleModule } from './modules/role/role.module';
import { SystemModule } from './modules/system/system.module';
import { StorageModule } from './modules/storage/storage.module';
import { StudentModule } from './modules/student/student.module';
import { DrizzleModule } from './common/drizzle/module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: ['.env.local', '.env'],
    }),
    DrizzleModule,
    EventEmitterModule.forRoot(),
    StorageModule,
    FacultyModule,
    PersonnelModule,
    StudentModule,
    AuthRestModule,
    PermissionModule,
    RoleModule,
    SystemModule,
    CurriculumRestModule,
    ThrottlerModule.forRoot({
      // 1000 requests per minute
      throttlers: [
        {
          ttl: 60 * 1000,
          limit: 1000,
        },
      ],
    }),
    TerminusModule,
  ],
})
export class AppModule {}
