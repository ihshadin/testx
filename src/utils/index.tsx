import { TOption } from "@/types/options.type";

export const mapToOptions = (data: TOption[]) =>
  data?.map(({ _id, name }) => ({ value: _id, label: name }));

// Convert arrray to params with query
export const convertParams = (quText: string, array: string[]) =>
  array.length > 0
    ? [{ name: quText, value: JSON.stringify(array) }]
    : undefined;
