import React from 'react';
import CAT from './CAT.svg';
import DOG from './DOG.svg';
import BIRD from './BIRD.svg';
import './App.css';
import SortableTree, { changeNodeAtPath, removeNode, addNodeUnderParent } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { useSelector, useDispatch } from 'react-redux';
import {changeTree} from './actions';
import { types } from './types';
import { uniqueId } from 'lodash';

function App() {
  const state = useSelector((state) => state.nodes);
  const dispatch = useDispatch();
  const getNodeKey = ({ treeIndex }) => treeIndex;

  const typeIcon = {
    CAT: CAT,
    DOG: DOG,
    BIRD: BIRD,
    default: CAT,
  }

  return (
    <div>
    <div className="App" style={{ height: 800 }}>
      <SortableTree 
        treeData={state}

        onChange={treeData => {
          dispatch(changeTree({ treeData }))}}
          
        generateNodeProps={({ node, path, treeIndex }) => ({
          title: (
            <>
            <div className="node-name d-inline">
            <img alt={node.type} src={typeIcon[node.type]} />
            <input className="form-control form-control-sm w-auto d-inline mt-1 mr-1" 
              value={node.title}
              onChange={event => {
              const newName = event.target.value;
              const newTreeData = changeNodeAtPath({ treeData: state, path, getNodeKey, newNode: { ...node, title: newName } })
              dispatch(changeTree({treeData: newTreeData}))
            }
            }
              /> 
              </div>
              
              <select name="types" id="types" className="form-control form-control-sm w-auto d-inline mt-1" onChange={(e) => {
                const newTreeData = changeNodeAtPath({ treeData: state, path, getNodeKey, newNode: { ...node, type: e.target.value } });
                dispatch(changeTree({ treeData: newTreeData }))
              }}>
                <option value={types.cat}>cat</option>
                <option value={types.dog}>dog</option>
                <option value={types.bird}>bird</option>
              </select>

              <button className="ml-4 btn btn-sm add p-3" onClick={() => {
                const newNode = { id: uniqueId(), title: 'untitled', type: types.default, removable: true, children: []}
                const newTreeData = addNodeUnderParent({ treeData: state, newNode: newNode, getNodeKey, parentKey: treeIndex })
                dispatch(changeTree({ treeData: [...newTreeData.treeData] }))
              }}></button>

              <button className="btn btn-sm remove p-3" onClick={() => {
                if (node.removable) {
                const newTreeData = removeNode({ treeData: state, path, getNodeKey})
                dispatch(changeTree({ treeData: newTreeData.treeData }))
                }
              }}></button>
            </>
          )
        })}
      />
    </div>
    </div>
  );
}

export default App;
