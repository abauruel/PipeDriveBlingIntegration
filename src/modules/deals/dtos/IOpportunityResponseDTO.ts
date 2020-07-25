interface IOrgProps {
  name: string;
  address: string;
}

export default interface IOpportunityResponseDTO {
  id: number;
  person_id?: {
    name: string;
    email?: [{ value?: string }];
    phone?: [{ value?: string }];
  };
  org_id: IOrgProps;
  title: string;
  value: number;
  currency?: string;
  add_time: Date;
  update_time?: Date;
  qtde: number;
  org_name?: string;
  pedido?: string | null;
}
