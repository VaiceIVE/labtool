import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.schema';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { TaskFile } from './entities/taskFile.schema';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) 
      private taskModel: Model<Task>,
      private userService: UserService
  ){}
  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel({...createTaskDto, asignees: createTaskDto.asignedGroups})
    await this.userService.addTaskCreated(createTaskDto.author, createdTask.id)
    for (const group of createTaskDto.asignedGroups)
    {
      await this.userService.addTaskAssigned(group, createdTask.id)
    }
    return await createdTask.save()
  }

  async findAll() {
    return await this.taskModel.find()
  }

  async findByTutor(authorid: string) {
    return await this.taskModel.find({author: authorid})
  }

  async findOne(id: string) {
    return await this.taskModel.find({id: id})
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskModel.updateOne({_id: new ObjectId(id)}, updateTaskDto);
  }

  async remove(id: string) {
    return await this.taskModel.deleteOne(new ObjectId(id));
  }

  async findByGroup (id: string)
  {
    return await this.taskModel.find({asignees: id})
  }
}
