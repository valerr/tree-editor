import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions';

const types = { file: 'FILE', dir: 'DIRECTORY' };

const initialState = {
  nodes: [
    {
    id: 1,
    name: 'project',
    type: types.dir,
    children: [
      { 
        id: 2,
        name: 'package.json',
        type: types.file,
      },
      {
        id: 3,
        types: types.dir,
        name: 'src',
        children: [
          {
            id: 4,
            name: 'index.js',
            types: types.file,
          }
        ]
      }
    ]
  }
 ],
}

const reducer = createReducer({initialState}, {
  // [actions.addNode]: (state, action) => {
    
  // },
});

export default reducer;