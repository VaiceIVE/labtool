import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { AccessTokenGuard } from 'src/auth/accessToken.guard';

@Controller('thread')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}


    //MESSAGE SECTION 

    @UseGuards(AccessTokenGuard)
    @Post(':id/message')
    async addMessage(@Body() createMessageDto: CreateMessageDto, @Req() req, @Param('id') thread: string)
    {
      return this.threadService.createMessage(thread, req.user.sub, createMessageDto)
    }

  @Post()
  async create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadService.create(createThreadDto);
  }

  @Get()
  async findAll() {
    return this.threadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.threadService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto) {
    return this.threadService.update(id, updateThreadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.threadService.remove(id);
  }


}
