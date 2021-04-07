import {EntityId} from "../entity/entity";

export enum TimerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export interface Timer {
  id: EntityId;
  status: TimerStatus;
  expiresAt: string;
}