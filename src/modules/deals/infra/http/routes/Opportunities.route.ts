import { Router } from 'express';
import OpportunityController from '../controllers/OpportunityController';

const OpportunityRouter = Router();
const opportunityController = new OpportunityController();

OpportunityRouter.get('/', opportunityController.store);
export default OpportunityRouter;
