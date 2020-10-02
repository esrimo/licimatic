const SEARCH_OPS = {
  url: "https://www.grants.gov/grantsws/rest/opportunities/search/",
  method: "POST",
  data: null,
};

const DEFAULT_SEARCH = {
  startRecordNum: 0,
  keyword: "",
  oppNum: "",
  cfda: "",
  oppStatuses: "forecasted|posted",
  sortBy: "openDate|desc",
};


module.exports = {
  SEARCH_OPS,
  DEFAULT_SEARCH
};
