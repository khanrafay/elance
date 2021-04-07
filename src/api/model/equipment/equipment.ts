import { EntityId } from '../entity/entity';
import { VenueItemPrice } from '../venue-booking/venue.item.price';
import {Taxonomy} from "../taxonomy/taxonomy";
import { File } from '../file/file';

export interface Equipment {
  id: EntityId;
  name: string;
  description: string;
  sportId: EntityId;
  enabled: boolean;

  priceList: VenueItemPrice[];

  profilePicture?: File;
}

export interface Equipmentwithnewapi {
  id: EntityId;
  name: string;
  description: string;
  sportId: EntityId;
  enabled: boolean;

  priceList: VenueItemPrice[];

  profilePicture?: File;
  equipmentType: {
    parentList?: [
      // id: EntityId;
    ],
    id: EntityId,
    status: string,
    icon?: File,
    taxonomy: Taxonomy,
    term: {
      name: string
    }
  }
}