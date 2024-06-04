import { Entity, ObjectIdColumn, Column, ManyToOne, JoinTable, OneToMany, ManyToMany } from "typeorm"
import { ObjectId } from 'mongodb'
import { User } from "src/database/entities-index"
import { TaskFile } from "./taskFile.entity"
import { Thread } from "src/thread/entities/thread.entity"
@Entity()
export class Task {

    @ObjectIdColumn()
    _id: ObjectId

    @Column({
        nullable: false,
        unique: true
    })
    title: string

    @Column({
        nullable: false
    })
    description: string

    @OneToMany(() => TaskFile, file => file.task)
    @JoinTable()
    files: File[]

    @ManyToOne(() => User, user => user.tasksCreated)
    @JoinTable()
    author: User

    @ManyToMany(() => User)
    @JoinTable()
    asignees: User[]

    @OneToMany(() => Thread, thread => thread.task)
    @JoinTable()
    threads: Thread[]
}
