import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class CachedList {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    resourceType: string // e.g., 'films', 'people'

  @Column('jsonb')
    data: any[] // Array of data items

  @Column()
    createdAt: Date

  @Column({ nullable: true })
    page: number // Optional, for pagination
}
