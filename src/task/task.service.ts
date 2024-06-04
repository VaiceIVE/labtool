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
    return this.taskRepository.find();
  }

  async findOne(id: string) {
    return this.taskRepository.findOneBy({_id: new ObjectId(id)});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
