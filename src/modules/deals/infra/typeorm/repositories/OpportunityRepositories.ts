import { MongoRepository, getMongoRepository } from 'typeorm';
import IOpportunityRepository from '../../../repositories/IOpportunityRepository';
import Opportunity from '../schemas/Opportunity';
import IOpportunity from '../../../dtos/IOpportunity';

class OpportunityRepositories implements IOpportunityRepository {
  private ormRepository: MongoRepository<Opportunity>;

  constructor() {
    this.ormRepository = getMongoRepository(Opportunity, 'mongo');
  }

  public async findAll(): Promise<Opportunity[]> {
    const opportunities = await this.ormRepository.find();
    return opportunities;
  }

  public async create(data: IOpportunity): Promise<IOpportunity> {
    const opportunityDay = new Opportunity();
    opportunityDay.data = data.data;
    opportunityDay.orderNumbers = data.orderNumbers;
    opportunityDay.total = data.total;
    try {
      await this.ormRepository.save(opportunityDay);
      return opportunityDay;
    } catch (err) {
      console.error(`Falha ao salvar dados: ${err}`);
    }
  }
}

export default OpportunityRepositories;
