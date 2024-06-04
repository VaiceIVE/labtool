import { BadRequestException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Equal, EqualOperator, Repository } from 'typeorm';
import { UserUpdateDto } from './dtos/userUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VkUserDto } from '../auth/dtos/vk.user.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    public async save(user: User)
    {
        return await this.userRepository.save(user)
    }

    public async create(user: CreateUserDto | VkUserDto)
    {
        const newUser = this.userRepository.create(user)
        await this.userRepository.save(newUser)
        return newUser
    }

    public async getOneById(id: string)
    {
        const _id = new ObjectId(id)
        const user = await this.userRepository.findOne({where:{_id: _id}})

        return await this.userRepository.findOne({where:{_id: _id}})
    }

    public async getOneByUsername(username: string)
    {
        return await this.userRepository.findOne({where:{username: username}})
    }

    public async getOneByUsernameWithPass(username: string)
    {
        return await this.userRepository.findOne({where:{username: username}, select: {
            avataruri: true,
            grade: true, 
            _id: true, 
            password: true,
            role: true,
            nickname: true,
            username: true,
            points: true,
        }})
    }

    public async getOneByNickname(nickname: string)
    {
        return await this.userRepository.findOne({where:{nickname: nickname}})
    }

    public async getOneByNicknameWithPass(nickname: string)
    {
        return await this.userRepository.findOne({where:{nickname: nickname}, select: {
            avataruri: true,
            grade: true, 
            _id: true, 
            password: true,
            role: true,
            nickname: true,
            username: true,
            points: true,
        }})
    }

    public async getAll()
    {
        return await this.userRepository.find()
    }

    public async updateOne(userid: string, userDto: UserUpdateDto)
    {
        let user = await this.getOneById(userid)
        Object.assign(user, userDto)
        return await this.userRepository.save(user)
    }

    public async deleteOne(id: string)
    {
        const _id = new ObjectId(id)
        let user = await this.userRepository.findOne({where: {_id: _id}})
        await this.userRepository.save(user)
        return await this.userRepository.delete({_id: _id})
    }

    async dropall()
    {
        return await this.userRepository.delete({})
    }
}
