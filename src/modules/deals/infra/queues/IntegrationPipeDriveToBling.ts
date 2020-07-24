import Queue from 'bull';
import redis from '../../../../shared/config/cache';
import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    redis,
  }),
  name: job.key,
  handle: job.handle,
}));

class IntegrationQueue {
  public add(name) {
    const newQueue = queues.find(queue => queue.name === name);
    return newQueue.bull.add(
      {},
      {
        repeat: {
          cron: `${process.env.JOB_MINUTE} ${process.env.JOB_HOUR} * * *`,
        },
      },
    );
  }

  public process(): void {
    return queues.forEach(queue => {
      queue.bull.process(queue.handle);
      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', job.name, job.data);
        console.log(err.message);
      });
    });
  }
}
export default IntegrationQueue;
