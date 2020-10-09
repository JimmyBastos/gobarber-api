import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryColumn
} from 'typeorm'

@Entity('notifications')
class Notification {
  @PrimaryColumn()
  id: ObjectID

  @Column()
  content: string

  @Column('uuid')
  recipient_id: string

  @Column({ default: false })
  read: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Notification
