import { Cat } from './Cat';

export type CatState = {
  cats: Cat[];
  currentPage: number;
  fetching: boolean;
};
