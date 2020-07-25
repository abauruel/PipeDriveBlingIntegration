import GetOpportunitiesWithStatusWon from '../providers/PipeDrive/GetOpportunitiesWithStatusWon';
import CreateOrderService from '../providers/Bling/CreateOrderService';
import GetNewOpportunities from '../providers/Bling/GetNewOpportunities';
import BuildOrderXML from '../providers/XmlBuilder/buildOrderXML';

class GetPipeDriveToBlingOpportunitiesAction {
  public async handle() {
    const getOpportunitiesWithStatusWon = new GetOpportunitiesWithStatusWon();
    const buildOrderXML = new BuildOrderXML();
    const createOrderService = new CreateOrderService();
    const getNewOpportunities = new GetNewOpportunities();

    try {
      // retorna todos as oportunidades com status ganho

      const opportunities = await getOpportunitiesWithStatusWon.execute();
      if (!opportunities) {
        throw new Error('unable to request opportunities');
      }
      // // retorna as oportunidades que nao possuem pedido.
      const newOpportunities = await getNewOpportunities.execute(opportunities);
      if (newOpportunities.length <= 0) {
        throw new Error('There are no new opportunities in the Bling');
      }

      const xmls = newOpportunities.map(opportunity =>
        buildOrderXML.execute(opportunity),
      );

      if (xmls.length <= 0) {
        throw new Error('Failed to generate XML');
      }

      // envio de xml para a criação de pedidos
      xmls.map(async xml => {
        const ped = await createOrderService.execute(xml);
        return ped;
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  public key = 'GetPipeDriveToBlingOpportunitiesAction';
}
export default GetPipeDriveToBlingOpportunitiesAction;
