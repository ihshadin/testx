export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TPagination = {
  meta: IMeta;
  setParams: any;
};
