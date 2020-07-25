import IOpportunitiesDayDTO from '../dtos/IOpportunitiesDayDTO';

export default interface IOpportunityRepository {
  create(data: IOpportunitiesDayDTO): Promise<IOpportunitiesDayDTO>;
  findAll(): Promise<IOpportunitiesDayDTO[]>;
  findById(id: string): Promise<IOpportunitiesDayDTO | undefined>;
  update(
    opportunity: IOpportunitiesDayDTO,
  ): Promise<IOpportunitiesDayDTO | undefined>;
  delete(opportunity: IOpportunitiesDayDTO): Promise<void | undefined>;
  findByDate(date: string): Promise<IOpportunitiesDayDTO | undefined>;
}
