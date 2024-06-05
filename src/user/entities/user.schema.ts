import { UserService } from "../user.service"
import { InjectRepository } from "@nestjs/typeorm"
import { ObjectId } from 'mongodb'
import { Task } from "src/task/entities/task.schema"
import { Thread } from "src/thread/entities/thread.schema"
import { Message } from "src/thread/entities/message.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"
@Schema()
export class User {

    @Prop(
        {
            nullable: false,
            unique: true
        }
    )
    username: string

    @Prop(
        {
            nullable: false,
        }
    )
    nickname: string

    @Prop(
        {
            nullable: true,
        }
    )
    password: string

    @Prop(
        {
            nullable: true,
        }
    )
    role: "admin" | "user" | "inspector"


    @Prop(
        {
            nullable: true,
        }
    )
    refreshToken: string
    
    @Prop
    (
        {
            nullable: true
        }
    )
    grade: "8" | "9" | "10" | "11" 
    
    points: number

    @Prop
    (
        {
            nullable: true,
        }
    )
    avataruri: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]})
    tasksCreated: Task[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]})
    tasksAssigned: Task[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }]})
    threads: Thread[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]})
    messages: Message[]

}

export const UserSchema = SchemaFactory.createForClass(User);