import {Video} from "./video.model";
export interface PlayListPaginated {
  count: Number,
  next: any,
  previous: any,
  results: PlayList[]
}

export interface PlayList {
  videos: Video[]
}
