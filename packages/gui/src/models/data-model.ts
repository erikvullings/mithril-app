export type DataModel = {
  version: number;
  lastUpdate: number;
};

export const EmptyDataModel = () =>
  ({
    version: 1,
    lastUpdate: Date.now(),
  } as DataModel);
