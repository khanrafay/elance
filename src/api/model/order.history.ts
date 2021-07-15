import {User} from "./user";

export interface OrderHistory {
  id: string;
  event: string;
  createdBy: User;
  approvedBy?: User;
  description: string;
  data: string[];
  createdAt: string;
  approvedAt?: string;
  approved: boolean;
}

export enum OrderHistoryStates {
  EXTEND = 'extend',
  CANCEL = 'cancel',
  DELIVER = 'deliver'
}