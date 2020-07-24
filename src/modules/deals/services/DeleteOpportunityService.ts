import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IOpportunityRepository from '../repositories/IOpportunityRepository';

@injectable()
class DeleteOpportunityService {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunityRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    try {
      const opportunity = await this.opportunityRepository.findById(id);
      if (!opportunity) {
        throw new Error('Opportunity not found');
      }

      await this.opportunityRepository.delete(opportunity);
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }
}
export default DeleteOpportunityService;
