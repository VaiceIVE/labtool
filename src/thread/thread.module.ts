import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { Message } from './entities/message.entity';
import { MessageFile } from './entities/messageFile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Thread, Message, MessageFile])],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
