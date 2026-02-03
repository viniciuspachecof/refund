import type { IReceipt } from './IReceipt';

export interface IRefund {
  id: string;
  title: string;
  category: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  receipt: IReceipt;
}
