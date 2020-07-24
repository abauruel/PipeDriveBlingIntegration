import FakeRepository from '../repositories/fakes/FakeOpportunityRepository';
import ListOpportunitiesService from './ListOpportunitiesService';

describe('ListOpportunitiesService', () => {
  it('should be able to list opportunities', async () => {
    const fakeRepository = new FakeRepository();
    const listOpportunitiesService = new ListOpportunitiesService(
      fakeRepository,
    );
    await fakeRepository.create({
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });
    const opportunities = await listOpportunitiesService.execute();
    expect(opportunities.length).toBe(1);
  });
});
