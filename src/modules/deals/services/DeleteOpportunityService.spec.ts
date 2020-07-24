import FakeRepository from '../repositories/fakes/FakeOpportunityRepository';
import DeleteOpportunityService from './DeleteOpportunityService';

describe('DeleteOpportunityService', () => {
  it('should be able to delete opportunity', async () => {
    const fakeRepository = new FakeRepository();
    const deleteOpportunityService = new DeleteOpportunityService(
      fakeRepository,
    );
    const opportunity1 = await fakeRepository.create({
      _id: '1',
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });
    await fakeRepository.create({
      _id: '2',
      data: '23/07/2020',
      orderNumbers: [],
      total: 0,
    });

    await deleteOpportunityService.execute(opportunity1._id);
    const opportunities = await fakeRepository.findById(opportunity1._id);

    expect(opportunities).toBeUndefined();
  });
  it('should not be able to delete opportunity', async () => {
    const fakeRepository = new FakeRepository();
    const deleteOpportunityService = new DeleteOpportunityService(
      fakeRepository,
    );
    await fakeRepository.create({
      _id: '1',
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });

    await expect(
      deleteOpportunityService.execute('nonexistent'),
    ).rejects.toBeInstanceOf(Error);
  });
});
