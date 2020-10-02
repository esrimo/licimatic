const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER || "licimatic",
  host:
    process.env.PGHOST ||
    "licimatic-db.ccl12ptpfcoh.us-west-2.rds.amazonaws.com",
  database: process.env.PGDATABASE || "licimatic",
  password: process.env.PGPASSWORD || "licimaticmaster",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

const query = (query) => {
  try {
    return pool.query(query);
  } catch (error) {
    return { error: error.stack };
  }
};

const INSERT_GRANTS = `
    INSERT INTO lm.grants
    VALUES %L
    RETURNING grant_id
`;

const GET_GRANTS_PAGINATED = `
  WITH 
    grants_desc AS (SELECT * FROM lm.grants ORDER BY open_date DESC),
    w_rn AS (SELECT row_number() OVER() AS rn, gd.* FROM grants_desc gd)
  SELECT * FROM w_rn wrn
  WHERE
    wrn.rn BETWEEN $1 AND $2
`;

const GET_STAT_OPENED_GRANTS_PER_YEAR = `
  select EXTRACT(year from open_date) year_part, count(1)::int from lm.grants group by EXTRACT(year from open_date) order by year_part
`;

const GET_STAT_OPENED_GRANTS_PER_DAY = `
  select to_char( open_date, 'DD-MON-YYYY') open_day, count(1)::int from lm.grants  group by open_date having count(1) > 5 order by open_date;
`;

const GET_STAT_GRANTS_PER_AGENCY = `
  select agency, count(1)::int from lm.grants group by agency having count(1) > 5 order by agency
`;

const GET_TOTAL_GRANTS = `
  select count(1)::int from lm.grants
`;

module.exports = {
  query,
  INSERT_GRANTS,
  GET_GRANTS_PAGINATED,
  GET_STAT_OPENED_GRANTS_PER_YEAR,
  GET_STAT_OPENED_GRANTS_PER_DAY,
  GET_STAT_GRANTS_PER_AGENCY,
  GET_TOTAL_GRANTS,
};
