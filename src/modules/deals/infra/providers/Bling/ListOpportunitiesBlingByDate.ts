import axios from 'axios';

import IOpportunity from '../../../dtos/IOpportunity';

interface IPedido {
  pedido: {
    data: string;
    numero: string;
    totalvenda: string;
    situacao: string;
    cliente: {
      nome: string;
    };
  };
}

interface IPedidosResponse {
  retorno: {
    pedidos: IPedido[];
  };
}

class ListOpportunitiesBlingByDate {
  public async execute(data: string): Promise<IOpportunity[] | undefined> {
    try {
      const response = await axios.get<IPedidosResponse>(
        `${process.env.BLING_HOST}pedidos/json`,
        {
          params: {
            apikey: process.env.BLING_TOKEN,
            filters: `dataEmissao[${data} TO ${data}]`,
          },
        },
      );
      if (response.data.retorno.pedidos) {
        const opportunities = response.data.retorno.pedidos.map(pedido => {
          const opportunity = {
            data: pedido.pedido.data,
            numero: pedido.pedido.numero,
            situacao: pedido.pedido.situacao,
            totalvenda: pedido.pedido.totalvenda,
            cliente: pedido.pedido.cliente.nome,
          };
          return opportunity;
        });
        return opportunities;
      }
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }
}

export default ListOpportunitiesBlingByDate;
