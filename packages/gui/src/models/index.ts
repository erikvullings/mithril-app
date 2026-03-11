export * from './page';
export * from './settings';
export * from './data-model';

export interface ILokiObj {
  id: number;
}

export type SearchResults<T = unknown> = T[];

export type LdbOperation<T> = Promise<T>;
