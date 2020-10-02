const axios = require("axios");
const {
  SEARCH_OPS,
  DEFAULT_SEARCH,
} = require("../services/defaults");
const { insertGrants } = require("../services/grants");
const { mapGrants } = require("../services/mapper");

const post = async (req, res) => {
  const search = req.body || DEFAULT_SEARCH;
  const { grantTotal } = req.query;

  const chunk = 25;
  const totalPages = Math.ceil(grantTotal / chunk);

  try {
    const responses = [];
    for (var i = 0; i < totalPages; i++) {
      const s = { ...search, startRecordNum: i * chunk };
      const r = await axios({ ...SEARCH_OPS, data: s });
      responses.push(r);
      if(r.data.oppHits){
        await insertGrants(mapGrants(r.data.oppHits));
      }
    }

    const hasErrors = responses.some(r => r.error);

    res.status(200).json({
      message: "Backfill finished",
      hasErrors: hasErrors,
      totalPagesFetched: totalPages
    });

  } catch (error) {
    console.log(error.stack);
    res
      .status(error.response.status || 500)
      .json(error.response.data || { error: error.stack });
  }
};

module.exports = { post };
