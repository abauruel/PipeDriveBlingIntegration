import FakeRepository from '../repositories/fakes/FakeOpportunityRepository';
import GetOpportunityByDateService from './GetOpportunityByDateService';

describe('GetOpportunityByDateService', () => {
  it('should be able to get opportunity by Date', async () => {
    const fakeRepository = new FakeRepository();
    const getOpportunityByDateservice = new GetOpportunityByDateService(
      fakeRepository,
    );

    const opportunity1 = await fakeRepository.create({
      _id: '1',
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });
    const opportunityDay = await getOpportunityByDateservice.execute(
      opportunity1.data,
    );
    expect(opportunityDay?._id).toEqual(opportunity1._id);
  });
  it('should not be able to get opportunity using invalid date', async () => {
    const fakeRepository = new FakeRepository();
    const getOpportunityByDateservice = new GetOpportunityByDateService(
      fakeRepository,
    );

    await fakeRepository.create({
      _id: '1',
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });
    await expect(
      getOpportunityByDateservice.execute('inexistent'),
    ).rejects.toBeInstanceOf(Error);
  });
});
