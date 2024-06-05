import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { ThreadModule } from './thread/thread.module';
import ormconfig from './ormconfig';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,

    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),

    TaskModule,

    ThreadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
