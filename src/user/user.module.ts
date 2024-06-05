import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSchema } from './entities/user.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
        imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
        controllers: [UserController],
        providers: [UserService],
        exports: [UserService]
    })
export class UserModule {}
