import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskFile } from './entities/taskFile.entity';
import { User } from 'src/database/entities-index';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Task, TaskFile]), UserModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
