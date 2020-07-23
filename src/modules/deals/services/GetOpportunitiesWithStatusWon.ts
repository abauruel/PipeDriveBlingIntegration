import axios from 'axios';
import IOpportunityDTO from '../dtos/IOpportunityDTO';

interface IResponseOpportunities {
  success: boolean;
  data: IOpportunityDTO[];
}

class GetOpportunitiesWithStatusWon {
  public async execute(): Promise<IOpportunityDTO[]> {
    try {
      const opportunitiesWon = await axios.get<IResponseOpportunities>(
        `${process.env.PIPE_HOST}/deals?status=won&api_token=${process.env.PIPEDRIVE_TOKEN}`,
      );
      const opportunities = opportunitiesWon.data.data;
      return opportunities;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default GetOpportunitiesWithStatusWon;
