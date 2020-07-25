import FakeRepository from '../repositories/fakes/FakeOpportunityRepository';
import GetDateByIdService from './GetDateByIdService';

describe('GetDateByIdService', () => {
  it('should be able to get date by Id', async () => {
    const fakeRepository = new FakeRepository();
    const getDateByIdService = new GetDateByIdService(fakeRepository);

    const opportunity1 = await fakeRepository.create({
      _id: '1',
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });

    const dateFound = await getDateByIdService.execute('1');
    expect(dateFound).toBe(opportunity1.data);
  });
  it('should not be able to get date by Id', async () => {
    const fakeRepository = new FakeRepository();
    const getDateByIdService = new GetDateByIdService(fakeRepository);

    await fakeRepository.create({
      _id: '1',
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });

    await expect(
      getDateByIdService.execute('nonexistent'),
    ).rejects.toBeInstanceOf(Error);
  });
});
