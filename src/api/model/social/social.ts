import { EntityId } from '../entity/entity';
import { Player } from '../player/player';

export interface BuddyRequest {
  id: EntityId;
  fromPlayer: Player;
  toPlayer: Player;
  approved?: boolean;
  isBuddy?: boolean;
}