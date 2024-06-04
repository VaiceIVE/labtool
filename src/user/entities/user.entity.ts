import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable, ManyToMany, BeforeInsert, BeforeUpdate, Repository, ObjectIdColumn } from "typeorm"
import { UserService } from "../user.service"
import { InjectRepository } from "@nestjs/typeorm"
import { ObjectId } from 'mongodb'
import { Task } from "src/task/entities/task.entity"
import { Thread } from "src/thread/entities/thread.entity"
import { Message } from "src/thread/entities/message.entity"
@Entity()
export class User {

    @ObjectIdColumn()
    _id: ObjectId

    @Column(
        {
            nullable: false,
        }
    )
    username: string

    @Column(
        {
            nullable: false,
        }
    )
    nickname: string

    @Column(
        {
            nullable: true,
            select: false
        }
    )
    password: string

    @Column(
        {
            nullable: true,
        }
    )
    role: "admin" | "user" | "inspector"


    @Column(
        {
            nullable: true,
        }
    )
    refreshToken: string
    
    @Column
    (
        {
            nullable: true
        }
    )
    grade: "8" | "9" | "10" | "11" 
    
    points: number

    @Column
    (
        {
            nullable: true,
        }
    )
    avataruri: string

    @OneToMany(() => Task, (task) => task.author)
    @JoinTable()
    tasksCreated: Task[]

    @ManyToMany(() => Task)
    @JoinTable()
    tasksAssigned: Task[]

    @OneToMany(() => Thread, thread => thread.student)
    @JoinTable()
    threads: Thread[]

    @OneToMany(() => Message, message => message.author)
    @JoinTable()
    messages: Message[]
}
