import axios from "axios";
import { stringify } from "querystring";

const ax = axios.create({
  baseURL: "http://18.237.181.189/",
});

export const fetchStats = () => {
  return (dispatch) => {
    ax.get("/grant-stats")
      .then((r) => dispatch({ type: "ADD_STATS", payload: r.data }))
      .catch((e) => console.log(e));
  };
};

export const fetchGrants = () => {
  return (dispatch, getState) => {
    const { start, offset } = getState().data.grantPagination;
    ax.get("/grant", {
      params: {
        start: start,
        offset: offset,
      },
    })
      .then((r) => dispatch({ type: "ADD_GRANTS", payload: r.data }))
      .catch((e) => console.log(e));
  };
};

export const fetchGrant = (id) => {
  return (dispatch) => {
    axios({
      url: "https://www.grants.gov/grantsws/rest/opportunity/details",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: stringify({ oppId: id }),
    })
      .then((r) => {
        if (r.status === 200) {
          dispatch({ type: "ADD_GRANT", payload: r.data });
        }
      })
      .catch((e) => console.log(e));
  };
};
