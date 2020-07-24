import IOpportunity from '../dtos/IOpportunity';

export default interface IOpportunityRepository {
  create(data: IOpportunity): Promise<IOpportunity>;
  findAll(): Promise<IOpportunity[]>;
  findById(id: string): Promise<IOpportunity | undefined>;
  update(opportunity: IOpportunity): Promise<IOpportunity>;
  delete(opportunity: IOpportunity): Promise<void>;
}
