import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSchema } from './entities/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './entities/group.schema';
import { GroupController } from './group.controller';


@Module({
        imports:[MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Group.name, schema: GroupSchema },
        ])],
        controllers: [UserController, GroupController],
        providers: [UserService],
        exports: [UserService]
    })
export class UserModule {}
