import { uuid } from 'uuidv4';
import FakeRepository from '../repositories/fakes/FakeOpportunityRepository';
import UpdateOpportunityService from './UpdateOpportunityService';

describe('UpdateOpportunityService', () => {
  it('should be able to update opportunity', async () => {
    const fakeRepository = new FakeRepository();
    const updateOpportunityService = new UpdateOpportunityService(
      fakeRepository,
    );

    const opportunity = await fakeRepository.create({
      _id: uuid(),
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });

    const newOpportunity = [
      {
        _id: '1',
        data: '22/07/2020',
        numero: '1',
        situacao: 'Em aberto',
        totalvenda: '10',
        cliente: 'teste1',
      },
    ];

    const opportunityUpdated = await updateOpportunityService.execute(
      opportunity._id,
      newOpportunity,
    );
    expect(opportunityUpdated.total).toBe(10);
  });
  it('should not be able to update opportunity using id nonexistent', async () => {
    const fakeRepository = new FakeRepository();
    const updateOpportunityService = new UpdateOpportunityService(
      fakeRepository,
    );

    const opportunity = await fakeRepository.create({
      _id: uuid(),
      data: '22/07/2020',
      orderNumbers: [],
      total: 0,
    });

    const newOpportunity = [
      {
        _id: '1',
        data: '22/07/2020',
        numero: '1',
        situacao: 'Em aberto',
        totalvenda: '10',
        cliente: 'teste1',
      },
    ];

    await expect(
      updateOpportunityService.execute('nonexistent', newOpportunity),
    ).rejects.toBeInstanceOf(Error);
  });
});
