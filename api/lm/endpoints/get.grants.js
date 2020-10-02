const { getGrantsPaginated, getTotalGrants } = require("../services/grants");

const get = async (req, res) => {
  const { start = 0, offset = 20 } = req.query;
  try {
    const r = await getGrantsPaginated(start, offset);
    const count = await getTotalGrants();

    res.status(200).json({ total_grants: count[0].count, grants: r });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { get };
