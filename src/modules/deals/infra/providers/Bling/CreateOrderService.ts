import request from 'request';

class CreateOrderService {
  public async execute(xml: string): Promise<string | null> {
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
    return new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        if (err) return reject(err);
        try {
          resolve(body);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}

export default CreateOrderService;
