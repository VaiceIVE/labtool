import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Thread } from './entities/thread.schema';
import { Model } from 'mongoose';
import { Message } from './entities/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { ObjectId } from 'mongodb';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ThreadService {
  constructor(
      @InjectModel(Thread.name) 
      private threadModel: Model<Thread>,
      @InjectModel(Message.name) 
      private messageModel: Model<Message>,
      private userService: UserService
  ){}
  async create(createThreadDto: CreateThreadDto) {
    const createdThread = await this.threadModel.create(createThreadDto)
    this.userService.addThread(createThreadDto.student, createdThread)
    return await createdThread.save()
  }

  async findAll() {
    return this.threadModel.find()
  }

  async findOne(id: string) {
    return this.threadModel.findById(id)
  }

  async update(id: string, updateThreadDto: UpdateThreadDto) {
    return this.threadModel.updateOne({id}, updateThreadDto)
  }

  async getTutored(id: string)
  {
    return this.threadModel.find({task:{author: id}})
  }

  async remove(id: string) {
    return this.threadModel.deleteOne({where: {id: id}})
  }

  async accept(id: string)
  {
    return this.threadModel.findByIdAndUpdate(id, {isDone: true})
  }

  async createMessage(thread: string, user: string, createMessageDto: CreateMessageDto)
  {
    const createdMessage = await this.messageModel.create({...createMessageDto, user:user, thread: thread})
    return await createdMessage.save()
  }
  async getMessages(id: string)
  {
    return this.messageModel.find({thread: id}).sort([['date', -1]])
  }

  async getForStudent(id: string)
  {
    return await this.threadModel.find({student: id})
  }

  async getForTask(id: string)
  {
    const threads = await this.threadModel.find({task: id})
    let res = []
    for (const thread of threads)
      {
        res.push({...thread, user: thread.student})
      }
    return res
  }

  async getForTaskAndStudent(taskid: string, studentid: string)
  {
    return await this.threadModel.find({task: taskid, student: studentid})
  }
}
