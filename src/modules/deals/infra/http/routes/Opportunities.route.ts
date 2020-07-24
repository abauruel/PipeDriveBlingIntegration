import { Router } from 'express';
import OpportunityController from '../controllers/OpportunityController';

const OpportunityRouter = Router();
const opportunityController = new OpportunityController();

OpportunityRouter.post('/', opportunityController.store);
OpportunityRouter.get('/', opportunityController.index);

export default OpportunityRouter;
