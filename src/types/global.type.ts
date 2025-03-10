export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TPagination = {
  meta: TMeta;
  setParams: any;
};
