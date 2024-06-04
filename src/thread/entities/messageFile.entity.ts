import { Entity, ObjectIdColumn, Column, ManyToOne, JoinTable } from "typeorm"
import { ObjectId } from 'mongodb'
import { User } from "src/database/entities-index"
import { Message } from "./message.entity"
@Entity()
export class MessageFile {

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

    @ManyToOne(() => Message, message => message.files)
    @JoinTable()
    message: Message

}
