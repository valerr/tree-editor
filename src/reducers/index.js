import { createReducer } from '@reduxjs/toolkit';
import { changeNodeAtPath, removeNode as removeNodeAtPath, addNodeUnderParent } from 'react-sortable-tree';
import { uniqueId } from 'lodash';
import * as actions from '../actions';
import types from '../types';

const getNodeKey = ({ treeIndex }) => treeIndex;

const reducer = createReducer({}, {
  [actions.changeTree]: (state, action) => {
    const { treeData } = action.payload;
    return {
      nodes: [...treeData],
    };
  },
  [actions.changeNode]: (state, action) => {
    const {
      node, path, newName, newType,
    } = action.payload;
    const newTreeData = changeNodeAtPath({
      treeData: state.nodes,
      path,
      getNodeKey,
      newNode: { ...node, title: newName, type: newType },
    });
    return {
      nodes: [...newTreeData],
    };
  },
  [actions.addNode]: (state, action) => {
    const { parentKey } = action.payload;
    const newNode = {
      id: uniqueId(),
      title: 'untitled',
      type: types.default,
      removable: true,
      children: [],
    };
    const newTreeData = addNodeUnderParent({
      treeData: state.nodes,
      newNode,
      getNodeKey,
      parentKey,
    });
    return {
      nodes: [...newTreeData.treeData],
    };
  },
  [actions.removeNode]: (state, action) => {
    const { node, path } = action.payload;
    if (node.removable) {
      const newTreeData = removeNodeAtPath({ treeData: state.nodes, path, getNodeKey });
      return {
        nodes: [...newTreeData.treeData],
      };
    }
    return state;
  },
});

export default reducer;
