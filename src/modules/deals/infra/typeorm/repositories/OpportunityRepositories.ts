import { MongoRepository, getMongoRepository } from 'typeorm';

import IOpportunityRepository from '../../../repositories/IOpportunityRepository';

import IOpportunitiesDayDTO from '../../../dtos/IOpportunitiesDayDTO';
import OpportunitiesDay from '../schemas/OpportunitiesDay';

class OpportunityRepositories implements IOpportunityRepository {
  private ormRepository: MongoRepository<OpportunitiesDay>;

  constructor() {
    this.ormRepository = getMongoRepository(OpportunitiesDay, 'mongo');
  }

  public async findAll(): Promise<OpportunitiesDay[]> {
    const opportunities = await this.ormRepository.find();
    return opportunities;
  }

  public async findById(id: string): Promise<OpportunitiesDay | undefined> {
    const opportunities = await this.ormRepository.findOne(id);

    return opportunities;
  }

  public async findByDate(date: string): Promise<OpportunitiesDay | undefined> {
    const opportunities = await this.ormRepository.findOne({
      where: {
        data: date,
      },
    });

    return opportunities;
  }

  public async create(data: IOpportunitiesDayDTO): Promise<OpportunitiesDay> {
    const opportunityDay = new OpportunitiesDay();
    opportunityDay.data = data.data;
    opportunityDay.orderNumbers = data.orderNumbers;
    opportunityDay.total = data.total;
    try {
      await this.ormRepository.save(opportunityDay);
      return opportunityDay;
    } catch (err) {
      console.error(`Falha ao salvar dados: ${err}`);
      throw new Error(err.message);
    }
  }

  public async update(
    opportunity: IOpportunitiesDayDTO,
  ): Promise<OpportunitiesDay | undefined> {
    await this.ormRepository.update(opportunity._id, opportunity);

    return this.ormRepository.findOne(opportunity._id);
  }

  public async delete(opportunity: IOpportunitiesDayDTO): Promise<void> {
    await this.ormRepository.delete(opportunity);
  }
}

export default OpportunityRepositories;
