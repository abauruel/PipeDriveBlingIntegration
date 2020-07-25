import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IOpportunityRepository from '../repositories/IOpportunityRepository';
import IOpportunityDayDTO from '../dtos/IOpportunitiesDayDTO';
import IOpportunity from '../dtos/IOpportunity';

@injectable()
class UpdateOpportunityService {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunityRepository,
  ) {}

  public async execute(
    id: string,
    opportunitiesIntegration: IOpportunity[],
  ): Promise<IOpportunityDayDTO> {
    try {
      const opportunity = await this.opportunityRepository.findById(id);

      if (!opportunity) {
        throw new Error('Invalid Opportunity');
      }

      const valueTotal = opportunitiesIntegration.reduce(
        (acc, curr) => (acc += Number(curr.totalvenda)),
        0,
      );
      opportunity.orderNumbers = opportunitiesIntegration.map(op => op);
      opportunity.total = valueTotal;
      await this.opportunityRepository.update(opportunity);
      return opportunity;
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }
}

export default UpdateOpportunityService;
