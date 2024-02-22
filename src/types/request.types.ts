export interface IOrderTypeForm {
  id?: number;
  userId?: string | undefined;
  fromCity: string;
  toCity: string;
  parcelType?: string;
  dispatchDate?: string;
  parcelDescription?: string;
  dateOfCreation?: string;
  selectedRequestType?: string;
}

export interface IDeliverTypeForm {
  id?: number;
  userId?: string | undefined;
  fromCity: string;
  toCity: string;
  dispatchDate?: string;
  dateOfCreation?: string;
  selectedRequestType?: string;
}
