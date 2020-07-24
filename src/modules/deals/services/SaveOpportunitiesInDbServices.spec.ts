import { uuid } from 'uuidv4';
import FakeRepository from '../repositories/fakes/FakeOpportunityRepository';
import SaveOpportunitiesInDbServices from './SaveOpportunitiesInDbService';

describe('SaveOpportunitiesInDbServices', () => {
  it('should be able to save opportunities in the database', async () => {
    const fakeRepository = new FakeRepository();
    const saveOpportunitiesInDbService = new SaveOpportunitiesInDbServices(
      fakeRepository,
    );
    const opportunity1 = {
      _id: uuid(),
      data: '22/07/2020',
      numero: '1',
      totalvenda: '10',
      cliente: 'Cliente 1',
      situacao: '6',
    };
    const opportunity2 = {
      _id: uuid(),
      data: '22/07/2020',
      numero: '2',
      totalvenda: '20',
      cliente: 'Cliente 2',
      situacao: '6',
    };
    const opportunity3 = {
      _id: uuid(),
      data: '22/07/2020',
      numero: '2',
      totalvenda: '30',
      cliente: 'Cliente 3',
      situacao: '6',
    };
    const opportunities = [opportunity1, opportunity2, opportunity3];

    const opportunityDaySaved = await saveOpportunitiesInDbService.execute(
      opportunities,
    );
    const opportunityDay = await fakeRepository.findById(
      opportunityDaySaved._id,
    );

    expect(opportunityDay?._id).toBe(opportunityDaySaved._id);
  });
});
