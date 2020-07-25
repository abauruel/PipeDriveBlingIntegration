import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Opportunity from './Opportunity';

@Entity('opportunities')
class OpportunitiesDay {
  @ObjectIdColumn()
  _id: string;

  @Column(type => Opportunity)
  orderNumbers: Opportunity[];

  @Column({ unique: true })
  data: string;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default OpportunitiesDay;
