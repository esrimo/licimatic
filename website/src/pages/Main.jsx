import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from "recharts";
import { fetchStats } from "../store/actions";
import GrantsTable from "../comps/GrantsTable";

const Main = (props) => {
  const { fetchStatsDispatch } = props;

  useEffect(() => {
    fetchStatsDispatch();
  }, [fetchStatsDispatch]);

  return (
    <div id="t">

      <div className="chart-card">
        <h2>Top Open Grants Per Agency</h2>
        <LineChart
          width={window.innerWidth - 75}
          height={Math.max(window.innerHeight * 0.35, 300)}
          data={props.grantsPerAgency}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="agency" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="count" stroke="#bb2629" yAxisId={0} />
        </LineChart>
      </div>
      <div className="chart-card">
        <h2>Open Grants Per Opening Year</h2>
        <LineChart
          width={window.innerWidth - 75}
          height={Math.max(window.innerHeight * 0.35, 300)}
          data={props.grantsPerYear}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="year_part" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="count" stroke="#bb2629" yAxisId={0} />
        </LineChart>
      </div>
      <div className="chart-card">
        <h2>Top Open Grants Per Day</h2>
        <LineChart
          width={window.innerWidth - 75}
          height={Math.max(window.innerHeight * 0.35, 300)}
          data={props.grantsPerDay}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="open_day" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="count" stroke="#bb2629" yAxisId={0} />
        </LineChart>
      </div>

      <div id="grants" style={{ height: 50 }}></div>
      <center>
        <h1>Grants</h1>
      </center>

      <div style={{ padding: "0 12px" }}>
        <GrantsTable />
      </div>
    </div>
  );
};

const s2p = (s) => {
  return {
    grantsPerDay: s.data.stats.grantsPerDay,
    grantsPerYear: s.data.stats.grantsPerYear,
    grantsPerAgency: s.data.stats.grantsPerAgency,
  };
};

const d2p = (d) => {
  return {
    fetchStatsDispatch: () => d(fetchStats()),
  };
};

export default connect(s2p, d2p)(Main);
