import { User } from "src/user/entities/user.schema"
import { MessageFile } from "./messageFile.schema"
import { Thread } from "./thread.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"
@Schema()
export class Message {

    @Prop({
        nullable: false
    })
    text: string

    @Prop({
        nullable: false,
        default: Date.now
    })
    dateCreated: Date

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'MessageFile' }]})
    files: MessageFile[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Thread' })
    thread: Thread
}

export const MessageSchema = SchemaFactory.createForClass(Message);
