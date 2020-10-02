const initialState = {
  data: {
    stats: {
      grantsPerDay: [],
      grantsPerYear: [],
      grantsPerAgency: [],
    },
    grantPagination: {
      start: 0,
      offset: 20,
    },
    grants: [],
    totalGrants: 0,
    grant: null,
    grantId: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PAGINATION":
      return {
        ...state,
        data: {
          ...state.data,
          grantPagination: {
            start: action.start,
            offset: action.offset,
          },
        },
      };

    case "ADD_STATS":
      return {
        ...state,
        data: {
          ...state.data,
          stats: { ...action.payload },
        },
      };

    case "ADD_GRANTS":
      return {
        ...state,
        data: {
          ...state.data,
          grants: [...action.payload.grants],
          totalGrants: action.payload.total_grants,
        },
      };

    case "ADD_GRANT":
    console.log(action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          grant: action.payload,
        },
      };

    case "GRANT_SELECTED":
      return {
        ...state,
        data: {
          ...state.data,
          grantId: action.id,
        },
      };

    default:
      return state;
  }
};

export default reducer;
