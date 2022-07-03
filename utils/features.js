class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
            // "i" means case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryDuplicate = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((field) => delete queryDuplicate[field]);

    let queryStr = JSON.stringify(queryDuplicate);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPg = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPg - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = Features;
