import { create } from 'xmlbuilder2';
import { format, parseISO } from 'date-fns';
import IOpportunityResponseDTO from '../../../dtos/IOpportunityResponseDTO';

class buildOrderXML {
  public execute(opportunity: IOpportunityResponseDTO): string {
    const { id, title, qtde = 1, value, add_time } = opportunity;

    const obj = {
      pedido: {
        numero: String(id).substr(0, 9),
        data: format(parseISO(String(add_time)), "dd'/'MM'/'yyyy"),
        cliente: {
          nome: title.substr(0, 80),
        },
        itens: {
          item: {
            codigo: String(id).substr(0, 60),
            descricao: title.substr(0, 120),
            un: 'un',
            qtde: String(qtde.toFixed(4)),
            vlr_unit: String(value.toFixed(10)),
          },
        },
      },
    };

    const doc = create(obj);
    return doc.end({ prettyPrint: true });
  }
}

export default buildOrderXML;
