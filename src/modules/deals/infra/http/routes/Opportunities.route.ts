import { Router } from 'express';
import OpportunityController from '../controllers/OpportunityController';

const OpportunityRouter = Router();
const opportunityController = new OpportunityController();

OpportunityRouter.post('/', opportunityController.store);
OpportunityRouter.get('/', opportunityController.index);
OpportunityRouter.put('/:id', opportunityController.update);
OpportunityRouter.delete('/:id', opportunityController.delete);

export default OpportunityRouter;
