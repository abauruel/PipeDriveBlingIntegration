import axios from 'axios';
import IOpportunityResponseDTO from '../../../dtos/IOpportunityResponseDTO';

interface Ipedido {
  data: {
    retorno: {
      erros: any;
      pedidos: [
        {
          pedido: {
            numero: string;
          };
        },
      ];
    };
  };
}

class GetNewOpportunities {
  public async execute(
    opportunities: IOpportunityResponseDTO[],
  ): Promise<IOpportunityResponseDTO[]> {
    // retorna lista de pedidos cadastrados
    const pedidos: Ipedido = await axios.get(
      `${process.env.BLING_HOST}pedidos/json`,
      {
        params: {
          apikey: process.env.BLING_TOKEN,
        },
      },
    );

    if (pedidos.data.retorno.erros) {
      return opportunities;
    }

    // retorna o numero de todos pedidos cadastrados
    const numeros = pedidos.data.retorno.pedidos.map(pedido =>
      parseInt(pedido.pedido.numero, 10),
    );

    // retorna opportunidades que nao possuem pedidos
    const newOpportunities = opportunities.filter(
      opportunity => !numeros.includes(opportunity.id),
    );

    return newOpportunities;
  }
}

export default GetNewOpportunities;
