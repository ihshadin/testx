import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm?.toString();
    if (searchTerm) {
      this.modelQuery = this?.modelQuery?.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }

    return this;
  }

  filter() {
    let queryObj = { ...this.query };

    // Filtering
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // for filtering in createdAt like ---=> 2024-05-05 to 2024-06-06
    if (queryObj.createdAt && typeof queryObj.createdAt === "string") {
      const { createdAt, ...restQueryObj } = queryObj;

      const createdAtNew = createdAt.split(",");

      const desiredDate = new Date(createdAtNew[0]);
      desiredDate.setHours(0, 0, 0, 0);
      let nextDay;

      if (createdAtNew.length > 1) {
        nextDay = new Date(createdAtNew[1]);
        nextDay.setHours(23, 59, 59, 999);
        restQueryObj.createdAt = {
          $gte: desiredDate,
          $lte: nextDay,
        };
      } else {
        nextDay = new Date(desiredDate);
        nextDay.setDate(desiredDate.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        restQueryObj.createdAt = {
          $gte: desiredDate,
          $lt: nextDay,
        };
      }

      queryObj = restQueryObj;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 0;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
