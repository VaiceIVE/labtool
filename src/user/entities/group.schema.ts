
import { Task } from "src/task/entities/task.schema"
import { Thread } from "src/thread/entities/thread.schema"
import { Message } from "src/thread/entities/message.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"
import { User } from "./user.schema"
@Schema()
export class Group {

    @Prop(
        {
            nullable: false,
            unique: true
        }
    )
    groupname: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }]})
    students: User[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]})
    tasksAssigned: Task[]
}

export const GroupSchema = SchemaFactory.createForClass(Group);