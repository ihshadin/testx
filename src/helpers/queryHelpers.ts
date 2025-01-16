import { NextRequest } from "next/server";

export const queryHelpers = (request: NextRequest) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const allQueries: Record<string, unknown> = {};
  searchParams.forEach((value, key) => {
    allQueries[key] = value;
  });

  return allQueries;
};
