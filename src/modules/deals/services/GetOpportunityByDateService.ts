import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IOpportunityRepository from '../repositories/IOpportunityRepository';

import IOpportunitiesDayDTO from '../dtos/IOpportunitiesDayDTO';

@injectable()
class GetOpportunityByDateService {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunityRepository,
  ) {}

  public async execute(
    date: string,
  ): Promise<IOpportunitiesDayDTO | undefined> {
    try {
      const opportunityRepository = await this.opportunityRepository.findByDate(
        date,
      );
      if (!opportunityRepository) {
        throw new Error('Opportunity inexistent for this date');
      }

      return opportunityRepository;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default GetOpportunityByDateService;
