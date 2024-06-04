import { Entity, ObjectIdColumn, Column, ManyToOne, JoinTable, OneToMany, ManyToMany } from "typeorm"
import { ObjectId } from 'mongodb'
import { User } from "src/database/entities-index"
import { Task } from "src/task/entities/task.entity"
import { Message } from "./message.entity"
@Entity()
export class Thread {

    @ObjectIdColumn()
    _id: ObjectId

    @OneToMany(() => Task, (task) => task.threads)
    @JoinTable()
    task: Task

    @Column({
        nullable: false,
        default: false
    })
    isDone: boolean

    @ManyToOne(() => User, user => user.threads)
    @JoinTable()
    student: User

    @OneToMany(() => Message, message => message.thread)
    @JoinTable()
    messages: Message[]
}
