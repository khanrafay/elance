import { EntityId } from '../entity/entity';
import { Facility } from '../facility/facility';
import { File } from '../file/file';
import { Player } from '../player/player';
import { Venue } from '../venue/venue';



export enum NotificationActorType {
  FACILITY_PROVIDER = 'facility_provider',
  PLAYER = 'player'
}

export interface Notification {
  id: EntityId;
  type: string;
  title: string;
  content?: string;
  entity?: { id: EntityId; type: string };
  issuerList: {
    id: EntityId; type: NotificationActorType, displayName?: string, profilePicture?: File;
  }[];
  createdAt: string;
  seenAt: number;
  data: string;
}