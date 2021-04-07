import { Entity, EntityId } from '../entity/entity';
import { File } from "../file/file";

export interface Message {
  id: EntityId;
  author: MessageActor;
  content: string;
  createdAt: string;
  seenAt: string;
}

export interface Thread {
  id: EntityId;
  participantList: ThreadParticipant[];
  latestMessage?: Message;
  createdAt: string;
  newMessageCount: number;
}

export interface ThreadParticipant {
  actor: MessageActor;
  isThreadCreator: boolean;
  isThreadOwner: boolean;
}

export interface MessageActor {
  type: MessageActorType | string;
  displayName: string;
  entity: Entity;
  profilePicture?: File;
  onlineStatus?: string;
  lastSeen?: string;
}

export enum MessageActorType {
  PLAYER = 'player',
  FACILITY_PROVIDER = 'facility_provider',
  COACH = 'coach'
}