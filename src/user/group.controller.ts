import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from '../auth/dtos/auth.dto';
import { UserUpdateDto } from './dtos/userUpdate.dto';
import { AccessTokenGuard } from '../auth/accessToken.guard';
import { CreateGroupDto } from './dtos/createGroup.dto';

@Controller('group')
export class GroupController
{
    constructor(
        private readonly userService: UserService
    ){}
    
    /*
    @Delete('dropall')
    public async dropAll()
    {
        return await this.userService.dropall()
    }

    @Delete(':userid')
    public async dropExact(@Param('userid') id: string)
    {
        return await this.userService.deleteOne(id)
    }    
*/
    @Post()
    public async createGroup(@Body()group: CreateGroupDto)
    {
        return await this.userService.createGroup(group)
    }

    @Get()
    public async getGroup()
    {
        return await this.userService.getGroup()
    }

    @Get(':id')
    public async getGroupById(@Param('id')id: string)
    {
        return await this.userService.getGroupById(id)
    }

}
