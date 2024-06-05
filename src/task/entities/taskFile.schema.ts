import { Task } from "./task.schema"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"
@Schema()
export class TaskFile {

    @Prop({
        nullable: false
    })
    fileSlug: string

    @Prop({
        nullable: false
    })
    fileName: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Task' })
    task: Task
}

export const TaskFileSchema = SchemaFactory.createForClass(TaskFile);