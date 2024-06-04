import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { ThreadModule } from './thread/thread.module';
import ormconfig from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,

    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),

    TaskModule,

    ThreadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
