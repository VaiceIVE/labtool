import { ObjectId } from 'mongodb'
import { Task } from "src/task/entities/task.schema"
import { Message } from "./message.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { User } from 'src/user/entities/user.schema'
@Schema()
export class Thread {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Task' })
    task: Task

    @Prop({
        nullable: false,
        default: false
    })
    isDone: boolean

    @Prop({
        nullable: false
    })

    name: string

    @Prop({
        nullable: false
    })
    description: string 
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    student: User

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]})
    messages: Message[]
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);