import { Entity, ObjectIdColumn, Column, ManyToOne, JoinTable } from "typeorm"
import { ObjectId } from 'mongodb'
import { Task } from "./task.entity"
@Entity()
export class TaskFile {

    @ObjectIdColumn()
    _id: ObjectId

    @Column({
        nullable: false
    })
    fileSlug: string

    @Column({
        nullable: false
    })
    fileName: string

    @ManyToOne(() => Task, task => task.files)
    @JoinTable()
    task: Task
}
