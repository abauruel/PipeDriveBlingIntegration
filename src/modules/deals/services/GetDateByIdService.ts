import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IOpportunityRepository from '../repositories/IOpportunityRepository';

@injectable()
class GetDateByIdService {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunityRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    try {
      const opportunity = await this.opportunityRepository.findById(id);
      if (!opportunity) {
        throw new Error('Opportunity not found');
      }

      return opportunity.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
export default GetDateByIdService;
