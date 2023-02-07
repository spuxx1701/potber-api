export default class BoardResource {
  id: string;
  name: string;
  description: string;
  threadsCount: number;
  repliesCount: number;
  categoryId: string;
  lastPost?: any; // TODO: narrow
  moderators?: any[]; // TODO: narrow
  page?: BoardPageResource;
}

export interface BoardPageResource {
  page: number;
  stickiesCount: number;
  globalsCount: number;
  threadsCount: number;
  threads: any[]; // TODO: narrow
}
