import {EntityId} from "../entity/entity";
import {Coach} from "../coach/coach";

export enum FacilityProviderRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED'
}

export interface FacilityProviderRequest {
  id: EntityId;
  coach: Coach;
  status: FacilityProviderRequestStatus[]
}