import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { format, parseISO } from 'date-fns';

import SaveOpportunitiesInDbService from '../../../services/SaveOpportunitiesInDbService';
import ListOpportunitiesService from '../../../services/ListOpportunitiesService';
import UpdateOpportunityService from '../../../services/UpdateOpportunityService';
import DeleteOpportunityService from '../../../services/DeleteOpportunityService';
import GetDateByIdService from '../../../services/GetDateByIdService';
import ListOpportunitiesBlingByDate from '../../providers/Bling/ListOpportunitiesBlingByDate';

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

    const listOpportunitiesByDate = new ListOpportunitiesBlingByDate();
    const saveOpportunitiesInDbService = container.resolve(
      SaveOpportunitiesInDbService,
    );
    try {
      const opportunitiesDay = await listOpportunitiesByDate.execute(date);

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

    const listOpportunitiesByDate = new ListOpportunitiesBlingByDate();
    const getDateByIdService = container.resolve(GetDateByIdService);
    const updateOpportunityService = container.resolve(
      UpdateOpportunityService,
    );
    try {
      // retorna data a partir do ID
      const dateById = await getDateByIdService.execute(id);

      // formata data para dd/mm/yyyy
      const dateByIdFormatted = format(parseISO(dateById), "dd'/'MM'/'yyyy");

      // busca opportunidades no provider a partir da Data informada
      const opportunitiesDay = await listOpportunitiesByDate.execute(
        dateByIdFormatted,
      );

      const opportunity = await updateOpportunityService.execute(
        id,
        opportunitiesDay,
      );
      return response.json(opportunity);
    } catch (err) {
      throw new Error(err);
    }
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
