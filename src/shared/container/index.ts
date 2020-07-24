import { container } from 'tsyringe';

import IOpportunityRepository from '../../modules/deals/repositories/IOpportunityRepository';
import OpportunityRepository from '../../modules/deals/infra/typeorm/repositories/OpportunityRepositories';

container.registerSingleton<IOpportunityRepository>(
  'OpportunityRepository',
  OpportunityRepository,
);
