import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { TaskFile } from './entities/taskFile.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
      @InjectRepository(Task)
        private taskRepository: Repository<Task>,
      private userService: UserService
  ){}
  async create(createTaskDto: CreateTaskDto) {
    const author = await this.userService.getOneById(createTaskDto.authorId)
    console.log(author)
    const newTask = this.taskRepository.create({...createTaskDto, author: author})
    await this.taskRepository.save(newTask)
    return newTask
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findByTutor(username: string) {
    console.log(username)
    return await this.taskRepository.find({where: {author: {username: username}}});
  }

  async findOne(id: string) {
    return await this.taskRepository.findOneBy({_id: new ObjectId(id)});
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update({_id: new ObjectId(id)}, updateTaskDto);
  }

  async remove(id: string) {
    return await this.taskRepository.delete(new ObjectId(id));
  }
}
