import 'reflect-metadata';

import { format } from 'date-fns';
import { container } from 'tsyringe';
import ListOpportunitiesBlingByDate from '../providers/Bling/ListOpportunitiesBlingByDate';
import SaveOpportunitiesInDbService from '../../services/SaveOpportunitiesInDbService';
import GetOpportunityByDateService from '../../services/GetOpportunityByDateService';
import UpdateOpportunityService from '../../services/UpdateOpportunityService';
import IOpportunity from '../../dtos/IOpportunity';

class ImportOrderFromBlingByDate {
  public async handle() {
    const listOpportunitiesByDate = new ListOpportunitiesBlingByDate();
    const getOpportunityByDateservice = container.resolve(
      GetOpportunityByDateService,
    );
    const saveOpportunitiesInDbService = container.resolve(
      SaveOpportunitiesInDbService,
    );
    const updateOpportunityService = container.resolve(
      UpdateOpportunityService,
    );

    try {
      const date = Date.now();
      const dateFormatted = format(date, "dd'/'MM'/'yyyy");

      // busca oportunidades no Bling a partir da data informada
      const opportunities: IOpportunity[] = await listOpportunitiesByDate.execute(
        dateFormatted,
      );

      // retorna oportunidades no banco a partir da data informada
      const opportunityDay = await getOpportunityByDateservice.execute(
        format(date, 'yyyy-MM-dd'),
      );

      // verifica se nao possui oportunidades para a data e cadastra
      if (opportunities && !opportunityDay) {
        await saveOpportunitiesInDbService.execute(opportunities);
      }

      // verifica se possui oportunidade para a data informada e atualiza
      if (opportunities && opportunityDay) {
        await updateOpportunityService.execute(
          opportunityDay._id,
          opportunities,
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  public key = 'ImportOrderFromBlingByDate';
}

export default ImportOrderFromBlingByDate;
