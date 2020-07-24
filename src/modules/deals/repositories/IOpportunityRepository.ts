import IOpportunity from '../dtos/IOpportunity';

export default interface IOpportunityRepository {
  create(data: IOpportunity): Promise<IOpportunity>;
  findAll(): Promise<IOpportunity[]>;
}
