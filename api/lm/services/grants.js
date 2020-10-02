const {
  query,
  INSERT_GRANTS,
  GET_GRANTS_PAGINATED,
  GET_STAT_OPENED_GRANTS_PER_YEAR,
  GET_STAT_OPENED_GRANTS_PER_DAY,
  GET_STAT_GRANTS_PER_AGENCY,
  GET_TOTAL_GRANTS,
} = require("./db");
const format = require("pg-format");

const e = (error) => {
  return error.error ? error : { error: error.stack };
};

const rows = (r, valuesOnly) => {
  if (r.rows) {
    return valuesOnly ? Object.values(r.rows) : r.rows;
  } else {
    return r;
  }
};

const get = async (sql, params, valuesOnly) => {
  try {
    const q = {
      text: sql,
      values: params,
    };
    const r = await query(q);
    return rows(r, valuesOnly);
  } catch (error) {
    return e(error);
  }
};

const insertGrants = async (grants) => {
  try {
    const sql = format(INSERT_GRANTS, grants);
    const r = await query(sql);
    return rows(r, true);
  } catch (error) {
    return e(error);
  }
};

const getGrantsPaginated = async (start, end) => {
  return get(GET_GRANTS_PAGINATED, [start, end], false);
};

const getOpenedGrantsXYear = () => {
  return get(GET_STAT_OPENED_GRANTS_PER_YEAR, [], false);
};

const getOpenedGrantsXDay = () => {
  return get(GET_STAT_OPENED_GRANTS_PER_DAY, [], false);
};

const getOpenedGrantsXAgency = () => {
  return get(GET_STAT_GRANTS_PER_AGENCY, [], false);
};

const getTotalGrants = () => {
  return get(GET_TOTAL_GRANTS, [], true);
};

module.exports = {
  insertGrants,
  getGrantsPaginated,
  getOpenedGrantsXYear,
  getOpenedGrantsXDay,
  getOpenedGrantsXAgency,
  getTotalGrants,
};
