import {EntityId} from "../entity/entity";
import {Equipment} from "../equipment/equipment";
import {Taxonomy} from "../taxonomy/taxonomy";

export enum NotListedGearStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED'
}

export interface NotListedGear {
  id: EntityId;
  name: string;
  image?: File;
  equipment?: Equipment;
  category: Taxonomy
  status: NotListedGearStatus[];
}