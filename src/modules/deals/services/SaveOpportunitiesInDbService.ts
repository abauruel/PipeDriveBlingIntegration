import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IOpportunityRepository from '../repositories/IOpportunityRepository';

import IOpportunity from '../dtos/IOpportunity';
import IOpportunityDayDTO from '../dtos/IOpportunitiesDayDTO';

@injectable()
class SaveOpportunitiesInDbService {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunityRepository,
  ) {}

  public async execute(
    opportunitiesDay: IOpportunity[],
  ): Promise<IOpportunityDayDTO> {
    try {
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
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default SaveOpportunitiesInDbService;
