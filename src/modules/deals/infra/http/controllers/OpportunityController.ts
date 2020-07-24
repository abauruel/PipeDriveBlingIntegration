import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListOpportunitiesBlingByDateService from '../../../services/ListOpportunitiesBlingByDateService';
import SaveOpportunitiesInDbService from '../../../services/SaveOpportunitiesInDbService';
import ListOpportunitiesService from '../../../services/ListOpportunitiesService';
import UpdateOpportunityService from '../../../services/UpdateOpportunityService';
import DeleteOpportunityService from '../../../services/DeleteOpportunityService';
import AppError from '../../../../../shared/errors/AppError';

class OpportunityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOpportunitiesByDateService = container.resolve(
      ListOpportunitiesService,
    );
    const opportunities = await listOpportunitiesByDateService.execute();
    return response.json(opportunities);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { date } = request.body;

    const listOpportunitiesByDateService = new ListOpportunitiesBlingByDateService();
    const saveOpportunitiesInDbService = container.resolve(
      SaveOpportunitiesInDbService,
    );
    try {
      const opportunitiesDay = await listOpportunitiesByDateService.execute(
        date,
      );

      const opportunitySaved = await saveOpportunitiesInDbService.execute(
        opportunitiesDay,
      );

      return response.json(opportunitySaved);
    } catch (err) {
      return response.json(err);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateOpportunityService = container.resolve(
      UpdateOpportunityService,
    );
    const opportunity = await updateOpportunityService.execute(id);
    return response.json(opportunity);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOpportunityService = container.resolve(
      DeleteOpportunityService,
    );
    const opportunity = await deleteOpportunityService.execute(id);
    return response.json(opportunity);
  }
}
export default OpportunityController;
