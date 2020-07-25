import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IOpportunityRepository from '../repositories/IOpportunityRepository';
import IOpportunity from '../dtos/IOpportunitiesDayDTO';

@injectable()
class ListOpportunitiesService {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunityRepository,
  ) {}

  public async execute(): Promise<IOpportunity[]> {
    const opportunities = await this.opportunityRepository.findAll();
    return opportunities;
  }
}

export default ListOpportunitiesService;
