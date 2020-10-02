const {
  getOpenedGrantsXYear,
  getOpenedGrantsXAgency,
  getOpenedGrantsXDay,
} = require("../services/grants");

const get = async (req, res) => {
  try {
    const gXy = await getOpenedGrantsXYear();
    const gXd = await getOpenedGrantsXDay();
    const gXa = await getOpenedGrantsXAgency();

    res.status(200).json({
      grantsPerYear: gXy,
      grantsPerDay: gXd,
      grantsPerAgency: gXa,
    });
  } catch (error) {
      console.log(error);
    res.status(500).json({error: error.stack});
  }
};

module.exports = { get };
