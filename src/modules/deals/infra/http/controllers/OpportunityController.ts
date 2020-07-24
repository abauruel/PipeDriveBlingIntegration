import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListOpportunitiesByDateService from '../../../services/ListOpportunitiesByDateService';
import SaveOpportunitiesInDbService from '../../../services/SaveOpportunitiesInDbService';

class OpportunityController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { initialDate, finalDate } = request.body;
    const listOpportunitiesByDateService = new ListOpportunitiesByDateService();
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
