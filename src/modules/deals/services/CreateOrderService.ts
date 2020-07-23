import request from 'request';

class CreateOrderService {
  public async execute(xml: string): Promise<string | null> {
    let pedido: any;
    try {
      const options = {
        method: 'POST',
        port: 443,
        url: `${process.env.BLING_HOST}pedido/json/`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        form: {
          apikey: process.env.BLING_TOKEN,
          xml,
        },
      };
      request(options, (err, res, body) => {
        pedido = body;
      });
      return pedido;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default CreateOrderService;
