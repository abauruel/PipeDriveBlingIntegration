import { Router } from 'express';
import Opportunity from '../../../../modules/deals/infra/http/routes/Opportunities.route';

const routes = Router();
routes.use('/Opportunities', Opportunity);

export default routes;
