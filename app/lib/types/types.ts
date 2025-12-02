export type LandIDResult = {
  result: boolean;
  owner?: string;
  contribution?: {
    kingdomId: string;
    total: number;
    name: string;
    continent: number;
  }[];
  err?: {
    code: string;
  }[];
};

export type LandSearchParams = {
  landId: string;
  fromDate: Date;
  toDate: Date;
};

export type ContributionData = {
  kingdomId: string;
  total: number;
  name: string;
  continent: number;
};
