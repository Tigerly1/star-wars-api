import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CachedItem<T> {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    resourceType: string // e.g., 'films', 'people'

  @Column()
    resourceId: string // e.g., '1', '2'

  @Column('jsonb')
    data: T // The actual data item

  @Column()
    createdAt: Date
}
