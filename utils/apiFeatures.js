class APIFeatures {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }
  filter() {
    let queryObj = { ...this.reqQuery };
    let excludedFields = ["page", "sort", "limit", "fields"];
    //make queryObj keep only filter object such as {name : 'tare'}
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) advance filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);
    this.query = this.query.find(queryStr);
    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      let sortBy = this.reqQuery.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  field() {
    if (this.reqQuery.fields) {
      const fields = this.reqQuery.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    let page = this.reqQuery.page * 1 || 1;
    let limit = this.reqQuery.limit * 1 || 100;
    let skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
