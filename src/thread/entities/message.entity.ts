import { Entity, ObjectIdColumn, Column, ManyToOne, JoinTable, OneToMany, ManyToMany, OneToOne } from "typeorm"
import { ObjectId } from 'mongodb'
import { User } from "src/database/entities-index"
import { MessageFile } from "./messageFile.entity"
import { Thread } from "./thread.entity"
@Entity()
export class Message {

    @ObjectIdColumn()
    _id: ObjectId

    @Column({
        nullable: false
    })
    text: string

    @ManyToOne(() => User, user => user.messages)
    @JoinTable()
    author: User

    @OneToMany(() => MessageFile, messageFile => messageFile.message)
    @JoinTable()
    files: MessageFile[]

    @ManyToOne(() => Thread, thread => thread.messages)
    @JoinTable()
    thread: Thread
}
