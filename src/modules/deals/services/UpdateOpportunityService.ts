import { injectable, inject } from 'tsyringe';
import IOpportunityRepository from '../repositories/IOpportunityRepository';
import IOpportunity from '../dtos/IOpportunity';
import ListOpportunitiesBlingByDateService from './ListOpportunitiesBlingByDateService';

@injectable()
class UpdateOpportunityService {
  constructor(
    @inject('OpportunityRepository')
    private opportunityRepository: IOpportunityRepository,
  ) {}

  public async execute(id: string): Promise<IOpportunity> {
    const listOpportunitiesByDateService = new ListOpportunitiesBlingByDateService();

    try {
      const opportunity = await this.opportunityRepository.findById(id);

      if (!opportunity) {
        throw new Error('Invalid Opportunity');
      }
      const opportunityUpdate = await listOpportunitiesByDateService.execute(
        String(opportunity.data),
      );

      const valueTotal = opportunityUpdate.reduce(
        (acc, curr) => (acc += Number(curr.totalvenda)),
        0,
      );
      opportunity.orderNumbers = opportunityUpdate.map(op => op);
      opportunity.total = valueTotal;
      await this.opportunityRepository.update(opportunity);
      return opportunity;
    } catch (err) {
      console.error(err.message);
    }
  }
}

export default UpdateOpportunityService;
