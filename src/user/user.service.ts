import { BadRequestException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.schema';
import { Equal, EqualOperator, Repository } from 'typeorm';
import { UserUpdateDto } from './dtos/userUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VkUserDto } from '../auth/dtos/vk.user.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/task/entities/task.schema';
import { Group } from './entities/group.schema';
import { CreateGroupDto } from './dtos/createGroup.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>,
        @InjectModel(Group.name) 
        private groupModel: Model<Group>
    ){}

    public async create(user: CreateUserDto)
    {
        const createdUser = new this.userModel(user)
        let group = await this.groupModel.findById(user.group)
        group.students.push(createdUser.id)
        await group.save()
        return await createdUser.save()
    }

    public async createGroup(group: CreateGroupDto)
    {
        return await this.groupModel.create(group)
    }

    public async getGroup()
    {
        return await this.groupModel.find()
    }

    public async addTaskCreated(userid: string, task: Task)
    {
        let user = await this.userModel.findById(userid)
        user.tasksCreated.push(task)
        return user.save()
    }

    public async addTaskAssigned(groupid: string, task: Task)
    {
        let group = await this.groupModel.findById(groupid)
        group.tasksAssigned.push(task)
        return group.save()
    }

    public async getOneById(id: string)
    {
        return await this.userModel.findById(id)
    }

    public async getOneByUsername(username: string)
    {
        return await this.userModel.findOne({username: username}) 
    }

    public async getOneByUsernameWithPass(username: string)
    {
        return await this.userModel.findOne({username: username})
    }

    public async getOneByNickname(nickname: string)
    {
        return await this.userModel.findOne({nickname: nickname})
    }

    public async getOneByNicknameWithPass(nickname: string)
    {
        return await this.userModel.findOne({nickname: nickname})
    }

    public async getAll()
    {
        return await this.userModel.find()
    }

    public async updateOne(userid: string, userDto: UserUpdateDto)
    {
        return await this.userModel.updateOne({id: userid}, userDto)
    }

    public async deleteOne(id: string)
    {
        return await this.userModel.deleteOne()
    }

    async dropall()
    {
        return await this.userModel.deleteMany({})
    }
}
