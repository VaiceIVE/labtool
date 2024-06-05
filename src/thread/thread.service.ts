import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Thread } from './entities/thread.schema';
import { Model } from 'mongoose';
import { Message } from './entities/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ThreadService {
  constructor(
      @InjectModel(Thread.name) 
      private threadModel: Model<Thread>,
      @InjectModel(Message.name) 
      private messageModel: Model<Message>,
  ){}
  async create(createThreadDto: CreateThreadDto) {
    const createdThread = await this.threadModel.create(createThreadDto)
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

  async remove(id: string) {
    return this.threadModel.deleteOne({id})
  }



  async createMessage(thread: string, user: string, createMessageDto: CreateMessageDto)
  {
    const createdMessage = await this.messageModel.create({...createMessageDto, user:user, thread: thread})
    return await createdMessage.save()
  }
}
