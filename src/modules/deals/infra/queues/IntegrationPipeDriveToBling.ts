import Queue from 'bull';
import redis from '../../../../shared/config/cache';
import * as jobs from '../jobs';

interface IAddQueue {
  name: string;
  hour: string;
  minute: string;
}
const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    redis,
  }),
  name: job.key,
  handle: job.handle,
}));

class IntegrationQueue {
  public add({ name, hour = '1', minute = '*' }: IAddQueue) {
    const newQueue = queues.find(queue => queue.name === name);
    return newQueue.bull.add(
      {},
      {
        repeat: {
          cron: `${minute} ${hour} * * *`,
        },
      },
    );
  }

  public process(): void {
    return queues.forEach(queue => {
      queue.bull.process(5, queue.handle);
      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', job.name, job.data, err.message);
      });
    });
  }
}
export default IntegrationQueue;
