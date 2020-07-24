import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListOpportunitiesBlingByDateService from '../../../services/ListOpportunitiesBlingByDateService';
import SaveOpportunitiesInDbService from '../../../services/SaveOpportunitiesInDbService';
import ListOpportunitiesService from '../../../services/ListOpportunitiesService';

class OpportunityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOpportunitiesByDateService = container.resolve(
      ListOpportunitiesService,
    );
    const opportunities = await listOpportunitiesByDateService.execute();
    return response.json(opportunities);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { initialDate, finalDate } = request.body;
    const listOpportunitiesByDateService = new ListOpportunitiesBlingByDateService();
    const saveOpportunitiesInDbService = container.resolve(
      SaveOpportunitiesInDbService,
    );

    const opportunitiesDay = await listOpportunitiesByDateService.execute(
      initialDate,
      finalDate,
    );
    const opportunitySaved = await saveOpportunitiesInDbService.execute(
      opportunitiesDay,
    );
    return response.json(opportunitySaved);
  }
}
export default OpportunityController;
