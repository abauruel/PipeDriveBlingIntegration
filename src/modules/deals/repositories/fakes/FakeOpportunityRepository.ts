import { uuid } from 'uuidv4';
import IOpportunityRepository from '../IOpportunityRepository';
import IOpportunity from '../../dtos/IOpportunity';

class FakeOpportunityRepository implements IOpportunityRepository {
  private fakeRepository: IOpportunity[] = [];

  public async create(data: Omit<IOpportunity, '_id'>): Promise<IOpportunity> {
    const opportunity = {
      ...data,
      _id: uuid(),
    };
    this.fakeRepository.push(opportunity);
    return opportunity;
  }

  public async findAll(): Promise<IOpportunity[]> {
    return this.fakeRepository;
  }

  public async findById(id: string): Promise<IOpportunity | undefined> {
    const opportunityFound = this.fakeRepository.find(
      opportunity => opportunity._id === id,
    );
    return opportunityFound;
  }

  public async update(opportunity: IOpportunity): Promise<IOpportunity> {
    const opportunityIndex = this.fakeRepository.findIndex(
      opportnity => opportnity._id === opportunity._id,
    );
    this.fakeRepository[opportunityIndex] = opportunity;
    return this.fakeRepository[opportunityIndex];
  }

  public async delete(opportunity: IOpportunity): Promise<void> {
    const opportunityIndex = this.fakeRepository.findIndex(
      opportnity => opportnity._id === opportunity._id,
    );
    this.fakeRepository.splice(opportunityIndex, 1);
  }
}

export default FakeOpportunityRepository;
