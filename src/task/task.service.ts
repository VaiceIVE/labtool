import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class TaskService {
  constructor(
      @InjectRepository(Task)
        private taskRepository: Repository<Task>,
  ){}
  async create(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.create(createTaskDto)
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: string) {
    return await this.taskRepository.findOneBy({_id: new ObjectId(id)});
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update({_id: new ObjectId(id)}, updateTaskDto);
  }

  async remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
