import IOpportunity from './IOpportunity';

export default interface IOpportunitiesDayDTO {
  _id: string;
  data: string;
  orderNumbers: IOpportunity[];
  total: number;
  created_at?: Date;
  updated_at?: Date;
}
