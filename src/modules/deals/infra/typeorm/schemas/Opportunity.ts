import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
class Opportunity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  numero: string;

  @Column()
  situacao: string;

  @Column()
  totalvenda: string;

  @Column()
  cliente: string;

  @Column()
  data: string;

  constructor(
    numero: string,
    situacao: string,
    totalvenda: string,
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
export default Opportunity;
