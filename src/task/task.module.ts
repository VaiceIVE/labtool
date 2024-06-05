import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './entities/task.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskFile, TaskFileSchema } from './entities/taskFile.schema';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema},
      { name: TaskFile.name, schema: TaskFileSchema}
    ]), 
      UserModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
