import 'dotenv/config';
import 'reflect-metadata';
import '../typeorm';
import '../../container';
import Queue from '../../../modules/deals/infra/queues/IntegrationPipeDriveToBling';

const queue = new Queue();

queue.add({
  name: 'GetPipeDriveToBlingOpportunitiesAction',
  hour: process.env.JOB1_HOUR || '12',
  minute: process.env.JOB1_MINUTE || '*',
});
queue.add({
  name: 'ImportOrderFromBlingByDate',
  hour: process.env.JOB2_HOUR || '22',
  minute: process.env.JOB2_MINUTE || '30',
});
queue.process();
