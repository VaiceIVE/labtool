import { ObjectId } from 'mongodb'
import { Message } from "./message.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
@Schema()
export class MessageFile {

    @Prop({
        nullable: false
    })
    fileSlug: string

    @Prop({
        nullable: false
    })
    fileName: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
    message: Message
}

export const MessageFileSchema = SchemaFactory.createForClass(MessageFile);