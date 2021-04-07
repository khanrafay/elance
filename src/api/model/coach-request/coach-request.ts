import {EntityId} from "../entity/entity";
import {Coach} from "../coach/coach";

export enum CoachRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED'
}

export interface CoachRequest {
  id: EntityId;
  coach: Coach;
  status: CoachRequestStatus[]
}