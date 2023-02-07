export default class Board {
  id: string;
  name: string;
  description: string;
  threadsCount: number;
  repliesCount: number;
  categoryId: string;
  lastPost?: any; // TODO: narrow
  moderators?: any[]; // TODO: narrow
  page?: BoardPage;
}

export interface BoardPage {
  page: number;
  stickiesCount: number;
  globalsCount: number;
  threadsCount: number;
  threads: any[]; // TODO: narrow
}
