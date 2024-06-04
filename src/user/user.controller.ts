import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from '../auth/dtos/auth.dto';
import { UserUpdateDto } from './dtos/userUpdate.dto';
import { AccessTokenGuard } from '../auth/accessToken.guard';

@Controller('user')
export class UserController
{
    constructor(
        private readonly userService: UserService
    ){}
    

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

    @Get()
    public async getAll()
    {
        return await this.userService.getAll()
    }

    @Get(':userid')
    public async getOneById(@Param('userid') userid: string)
    {
        return await this.userService.getOneByNickname((await this.userService.getOneById(userid)).nickname)
    }

    @Post(':id')
    public async updateOneAdmined(@Body() userDto: UserUpdateDto, @Param('id')id: string)
    {
        return await this.userService.updateOne(id, userDto)
    }

    @UseGuards(AccessTokenGuard)
    @Post('')
    public async updateOne(@Body() userDto: UserUpdateDto, @Req() req)
    {
        return await this.userService.updateOne(req.user.sub, userDto)
    }    

    @UseGuards(AccessTokenGuard)
    @Delete('')
    public async deleteOne(@Req() req)
    {
        return await this.userService.deleteOne(req.user.sub)
    }
}
