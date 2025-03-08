import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search(searchableFields: string[]) {
  //   const searchTerm = this?.query?.searchTerm?.toString();
  //   if (searchTerm) {
  //     this.modelQuery = this?.modelQuery?.find({
  //       $or: searchableFields.map(
  //         (field) =>
  //           ({
  //             [field]: { $regex: searchTerm, $options: "i" },
  //           } as FilterQuery<T>)
  //       ),
  //     });
  //   }

  //   return this;
  // }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm?.toString();
    if (searchTerm) {
      this.modelQuery = this?.modelQuery?.find({
        $or: searchableFields.map((field) => {
          // Convert numeric fields to string for comparison
          return {
            $expr: {
              $regexMatch: {
                input: { $toString: `$${field}` }, // Convert qId to string
                regex: searchTerm,
                options: "i", // Case-insensitive match
              },
            },
          };
          return {
            [field]: { $regex: searchTerm, $options: "i" }, // Perform regex match on other fields
          };
        }),
      });
    }

    return this;
  }

  filter() {
    let queryObj = { ...this.query };

    // Filtering
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Handle filtering by `courses`
    if (queryObj.courses && typeof queryObj.courses === "string") {
      try {
        const parsedCourses = JSON.parse(queryObj.courses); // Parse courses as JSON
        if (Array.isArray(parsedCourses)) {
          queryObj.courses = { $in: parsedCourses }; // Use $in for array matching
        } else {
          throw new Error("Courses parameter must be an array");
        }
      } catch (err) {
        throw new Error(
          "Invalid courses parameter: must be a valid JSON array"
        );
      }
    }

    if (queryObj.subjects && typeof queryObj.subjects === "string") {
      try {
        const parsedCourses = JSON.parse(queryObj.subjects); // Parse courses as JSON
        if (Array.isArray(parsedCourses)) {
          queryObj.subjects = { $in: parsedCourses }; // Use $in for array matching
        } else {
          throw new Error("Subjects parameter must be an array");
        }
      } catch (err) {
        throw new Error(
          "Invalid subjects parameter: must be a valid JSON array"
        );
      }
    }

    if (queryObj.topics && typeof queryObj.topics === "string") {
      try {
        const parsedCourses = JSON.parse(queryObj.topics); // Parse courses as JSON
        if (Array.isArray(parsedCourses)) {
          queryObj.topics = { $in: parsedCourses }; // Use $in for array matching
        } else {
          throw new Error("Topics parameter must be an array");
        }
      } catch (err) {
        throw new Error("Invalid topics parameter: must be a valid JSON array");
      }
    }

    if (queryObj.teachers && typeof queryObj.teachers === "string") {
      try {
        const parsedCourses = JSON.parse(queryObj.teachers); // Parse courses as JSON
        if (Array.isArray(parsedCourses)) {
          queryObj.teachers = { $in: parsedCourses }; // Use $in for array matching
        } else {
          throw new Error("Teachers parameter must be an array");
        }
      } catch (err) {
        throw new Error(
          "Invalid Teachers parameter: must be a valid JSON array"
        );
      }
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
    const limit = Number(this?.query?.limit) || 10;
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
