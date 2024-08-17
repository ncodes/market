type ObjectID = string; // or the equivalent type you are using in your system
export type VideoStatus = "processing" | "processed" | "processing_failed";
export type ProcessingStatus = "video_not_found";
export type VideoPlatform = "youtube" | "local";

export interface User {
  object: string;
  id: ObjectID;
  walletAddress: string;
}

export interface Video {
  object: string;
  id?: ObjectID;
  owner?: string;
  url?: string;
  platform?: VideoPlatform;
  platformId?: string;
  duration: number;
  status?: VideoStatus;
  processingStatus?: ProcessingStatus;
  contentType?: string;
  extension?: string;
  aspectRatio: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteType = "text";

export interface Note {
  object: string;
  id: ObjectID;
  body: string;
  type: NoteType;
  time: number;
  clipId: string;
  blockIndex: number;
  userId: string;
  positionX: number;
  positionY: number;
  createdAt: string;
  updatedAt: string;
}

export interface RequestMeta {
  count: number;
}

export interface Clip {
  object: string;
  id?: ObjectID;
  name?: string;
  title?: string;
  userId?: string;
  description?: string;
  videoId?: string;
  timeline?: Timeline;
  duration: number;
  views: number;
  publish?: boolean;
  merged?: boolean;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

type TimelineType = "clip" | "momeme";

export interface Timeline {
  type: TimelineType;
  layers: TimelineLayer[];
}

export type TimelineLayerType = "visual" | "audio" | "overlay";

export type SceneObjectType = "trim_full" | "trim_video_only" | "trim_frame_only" | "trim_audio_only" | "merge";

export interface SceneObject {
  id: ObjectID;
  type: SceneObjectType;
  duration: number;
  scene: TimelineScene;
  index: number;
}

export interface TimelineScene {
  name: string;
  objects: SceneObject[];
}

export interface TimelineLayer {
  type: TimelineLayerType;
  scenes: TimelineScene[];
}

export interface Follow {
  object: string;
  id: ObjectID;
  userId: string;
  followerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  object: string;
  id: ObjectID;
  userId: string;
  clipId: string;
  dislike: false;
  createdAt: string;
  updatedAt: string;
}
