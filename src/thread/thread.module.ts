import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread, ThreadSchema } from './entities/thread.schema';
import { Message, MessageSchema } from './entities/message.schema';
import { MessageFile, MessageFileSchema } from './entities/messageFile.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Thread.name, schema: ThreadSchema },
      { name: Message.name, schema: MessageSchema},
      { name: MessageFile.name, schema: MessageFileSchema},
    ])],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
