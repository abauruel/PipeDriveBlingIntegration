import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
class Order {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  numero: string;

  @Column()
  situacao: string;

  @Column()
  totalvenda: number;

  @Column()
  cliente: string;

  @Column()
  data: string;

  constructor(
    numero: string,
    situacao: string,
    totalvenda: number,
    cliente: string,
    data: string,
  ) {
    this.numero = numero;
    this.situacao = situacao;
    this.totalvenda = totalvenda;
    this.cliente = cliente;
    this.data = data;
  }
}
export default Order;
