import { ObjectId } from 'mongodb'
import { TaskFile } from "./taskFile.schema"
import { Thread } from "src/thread/entities/thread.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { User } from 'src/user/entities/user.schema'


@Schema()
export class Task {

    @Prop({
        nullable: false,
        unique: true
    })
    title: string

    @Prop({
        nullable: false
    })
    description: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'TaskFile' }]})
    files: TaskFile[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }]})
    asignees: User[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]})
    threads: Thread[]
}

export const TaskSchema = SchemaFactory.createForClass(Task);