import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions';

const reducer = createReducer({}, {
  [actions.changeTree]: (state, action) => {
    const { treeData } = action.payload;
    return {
      nodes: [...treeData],
    };
  },
});

export default reducer;
