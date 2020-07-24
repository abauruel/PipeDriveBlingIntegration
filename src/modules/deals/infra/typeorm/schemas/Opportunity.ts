import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from './Order';

@Entity('opportunities')
class Opportunity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column(type => Order)
  orderNumbers: Order[];

  @Column({ unique: true })
  data: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Opportunity;
