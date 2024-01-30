import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CachedItem {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    resourceType: string // e.g., 'films', 'people'

  @Column()
    resourceId: string // e.g., '1', '2'

  @Column('jsonb')
    data: any // The actual data item

  @Column()
    createdAt: Date
}
