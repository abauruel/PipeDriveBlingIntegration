import 'dotenv/config';
import Queue from '../../../modules/deals/infra/queues/IntegrationPipeDriveToBling';

const queue = new Queue();

queue.add('GetPipeDriveToBlingOpportunitiesAction');
queue.process();
