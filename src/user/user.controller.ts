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
    @UseGuards(AccessTokenGuard)
    @Get('me')
    public async getMe(@Req() req)
    {
        try {
            return await this.userService.getOneByUsername(req.user.username)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    @Get()
    public async getAll()
    {
        try {
            return await this.userService.getAll()
        } catch (error) {
            console.log(error)
            return error
        }
    }

    @Get(':userid')
    public async getOneById(@Param('userid') userid: string)
    {
        console.log(userid)
        try {
            return await this.userService.getOneById(userid)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    @Post(':id')
    public async updateOneAdmined(@Body() userDto: UserUpdateDto, @Param('id')id: string)
    {
        try {
            return await this.userService.updateOne(id, userDto)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    @UseGuards(AccessTokenGuard)
    @Post('')
    public async updateOne(@Body() userDto: UserUpdateDto, @Req() req)
    {
        try {
            return await this.userService.updateOne(req.user.sub, userDto)
        } catch (error) {
            console.log(error)
            return error
        }
    }    

    @UseGuards(AccessTokenGuard)
    @Delete('')
    public async deleteOne(@Req() req)
    {
        try {
            return await this.userService.deleteOne(req.user.sub)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
