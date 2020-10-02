const moment = require("moment");

const toDate = (d) => (d === "" || !moment.isDate(new Date(d)) ? null : d);

const grantMapper = (g) => {
  return [
    g.id,
    g.number,
    g.title,
    g.agencyCode,
    g.agency,
    toDate(g.openDate),
    toDate(g.closeDate),
    g.oppStatus,
    g.docType,
  ];
};

const mapGrants = (grants) => {
  return grants.map(grantMapper);
};

module.exports = {
  mapGrants,
};
