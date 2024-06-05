import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AccessTokenGuard } from 'src/auth/accessToken.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try{
      return await this.taskService.create(createTaskDto);
    }
    catch(e)
    {
      console.log(e)
      return e
    }
  }

  @Get()
  public async findAll() {
    try{
      return await this.taskService.findAll();
    }
    catch(e)
    {
      console.log(e)
      return e
    }
  }

  @Get('group/:id')
  public async findByGroupId(@Param('id') id: string) {
    try{
      return await this.taskService.findByGroup(id);
    }
    catch(e)
    {
      console.log(e)
      return e
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get('tutor')
  public async findByTutor(@Req() req) {
    try{
      return await this.taskService.findByTutor(req.user.sub);
    }
    catch(e)
    {
      console.log(e)
      return e
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      return await this.taskService.findOne(id);
    }
    catch(e)
    {
      console.log(e)
      return e
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try{
      return await this.taskService.update(id, updateTaskDto);
    }
    catch(e)
    {
      console.log(e)
      return e
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{
      return await this.taskService.remove(id);
    }
    catch(e)
    {
      console.log(e)
      return e
    }
  }
}
