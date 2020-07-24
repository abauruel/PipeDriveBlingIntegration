import { MongoRepository, getMongoRepository } from 'typeorm';
import { ObjedctID } from 'mongodb';
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

  public async findById(id: string): Promise<Opportunity | undefined> {
    const opportunities = await this.ormRepository.findOne({
      where: {
        _id: id,
      },
    });

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

  public async update(opportunity: Opportunity): Promise<Opportunity> {
    this.ormRepository.update(opportunity._id, opportunity);
    return this.ormRepository.findOne(opportunity._id);
  }

  public async delete(opportunity: IOpportunity): Promise<void> {
    await this.ormRepository.delete(opportunity);
  }
}

export default OpportunityRepositories;
