import { uuid } from 'uuidv4';
import IOpportunityRepository from '../IOpportunityRepository';

import IOpportunitiesDayDTO from '../../dtos/IOpportunitiesDayDTO';

class FakeOpportunityRepository implements IOpportunityRepository {
  private fakeRepository: IOpportunitiesDayDTO[] = [];

  public async create(
    data: IOpportunitiesDayDTO,
  ): Promise<IOpportunitiesDayDTO> {
    const opportunity = {
      ...data,
      _id: uuid(),
    };
    this.fakeRepository.push(opportunity);
    return opportunity;
  }

  public async findAll(): Promise<IOpportunitiesDayDTO[]> {
    return this.fakeRepository;
  }

  public async findById(id: string): Promise<IOpportunitiesDayDTO | undefined> {
    const opportunityFound = this.fakeRepository.find(
      opportunity => opportunity._id === id,
    );
    return opportunityFound;
  }

  public async findByDate(
    date: string,
  ): Promise<IOpportunitiesDayDTO | undefined> {
    const opportunityFound = this.fakeRepository.find(
      opportunity => opportunity.data === date,
    );
    return opportunityFound;
  }

  public async update(
    opportunity: IOpportunitiesDayDTO,
  ): Promise<IOpportunitiesDayDTO> {
    const opportunityIndex = this.fakeRepository.findIndex(
      opportnity => opportnity._id === opportunity._id,
    );
    this.fakeRepository[opportunityIndex] = opportunity;
    return this.fakeRepository[opportunityIndex];
  }

  public async delete(opportunity: IOpportunitiesDayDTO): Promise<void> {
    const opportunityIndex = this.fakeRepository.findIndex(
      opportnity => opportnity._id === opportunity._id,
    );
    this.fakeRepository.splice(opportunityIndex, 1);
  }
}

export default FakeOpportunityRepository;
