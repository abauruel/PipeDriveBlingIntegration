import 'dotenv/config';
import 'reflect-metadata';
import '../typeorm';
import '../../container';
import Queue from '../../../modules/deals/infra/queues/IntegrationPipeDriveToBling';

const queue = new Queue();

queue.add({
  name: 'GetPipeDriveToBlingOpportunitiesAction',
  hour: '*',
  minute: '*',
});
queue.add({ name: 'ImportOrderFromBlingByDate', hour: '22', minute: '19' });
queue.process();
