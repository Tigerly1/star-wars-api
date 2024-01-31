import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class CachedList<T> {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    resourceType: string // e.g., 'films', 'people'

  @Column('jsonb')
    data: T[] // Array of data items

  @Column()
    createdAt: Date

  @Column({ nullable: true })
    page: number // Optional, for pagination
}
