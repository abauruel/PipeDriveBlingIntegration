import { injectable, inject } from 'tsyringe';

import IOpportunityRepository from '../repositories/IOpportunityRepository';

import IOpportunityIntegrated from '../dtos/IOpportunityIntegrated';
import IOpportunity from '../dtos/IOpportunity';

@injectable()
class SaveOpportunitiesInDbService {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunityRepository,
  ) {}

  public async execute(
    opportunitiesDay: IOpportunityIntegrated[],
  ): Promise<IOpportunity> {
    const valueTotal = opportunitiesDay.reduce(
      (acc, curr) => (acc += Number(curr.totalvenda)),
      0,
    );
    const opportunitiesDayWithTotalValue = {
      data: opportunitiesDay[0].data,
      orderNumbers: [...opportunitiesDay],
      total: valueTotal,
    };
    const opportunitiesSaved = await this.opportunityRepository.create(
      opportunitiesDayWithTotalValue,
    );
    return opportunitiesSaved;
  }
}

export default SaveOpportunitiesInDbService;
