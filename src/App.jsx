/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import SortableTree, { changeNodeAtPath, removeNode, addNodeUnderParent } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';
import types from './types';
import { changeTree } from './actions';
import CAT from './CAT.svg';
import DOG from './DOG.svg';
import BIRD from './BIRD.svg';
import edit from './edit.svg';
import tick from './tick.svg';
import cancel from './cancel.svg';
import './App.css';

function App() {
  const nodes = useSelector((state) => state.nodes);
  const dispatch = useDispatch();
  const getNodeKey = ({ treeIndex }) => treeIndex;
  const [editingNode, setEditing] = useState({ treeIndex: null, name: null, type: null });

  const typeIcon = {
    CAT,
    DOG,
    BIRD,
    default: CAT,
  };

  const changeNode = ({ node, path }) => ({
    title: (
      <>
        <div className="node-name d-inline">
          <img alt={node.type} src={typeIcon[node.type]} />
          <input
            className="form-control form-control-sm w-auto d-inline mt-1 mr-1"
            value={editingNode.name}
            onChange={(event) => {
              setEditing({ ...editingNode, name: event.target.value });
            }}
          />
        </div>

        <select
          name="types"
          id="types"
          className="form-control form-control-sm w-auto d-inline mt-1"
          onChange={(e) => {
            setEditing({ ...editingNode, type: e.target.value });
          }}
        >
          <option value={types.cat}>cat</option>
          <option value={types.dog}>dog</option>
          <option value={types.bird}>bird</option>
        </select>

        <button
          type="button"
          className="btn btn-sm edit"
          onClick={() => {
            setEditing({ treeIndex: null });
            const newTreeData = changeNodeAtPath({
              treeData: nodes,
              path,
              getNodeKey,
              newNode: { ...node, title: editingNode.name, type: editingNode.type },
            });
            dispatch(changeTree({ treeData: newTreeData }));
          }}
        >
          <img alt="submit" src={tick} />
        </button>
        <button
          type="button"
          className="btn btn-sm edit"
          onClick={() => {
            setEditing({ treeIndex: null });
          }}
        >
          <img alt="cancel" src={cancel} />
        </button>
      </>
    ),
  }
  );

  return (
    <div>
      <div className="App" style={{ height: 800 }}>
        <SortableTree
          treeData={nodes}
          onChange={(treeData) => {
            dispatch(changeTree({ treeData }));
          }}
          generateNodeProps={({ node, path, treeIndex }) => {
            if (editingNode.treeIndex === treeIndex) {
              return changeNode({ node, path, treeIndex });
            }
            return {
              title: (
                <>
                  <div className="node-name d-inline mr-1">
                    <img alt={node.type} src={typeIcon[node.type]} />
                    {node.title}
                  </div>
                  <button type="button" className="ml-4 btn btn-sm edit" onClick={() => setEditing({ treeIndex, name: node.title, type: node.type })}>
                    <img alt="edit" src={edit} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm add p-3"
                    onClick={() => {
                      const newNode = {
                        id: uniqueId(),
                        title: 'untitled',
                        type: types.default,
                        removable: true,
                        children: [],
                      };
                      const newTreeData = addNodeUnderParent({
                        treeData: nodes,
                        newNode,
                        getNodeKey,
                        parentKey: treeIndex,
                      });
                      dispatch(changeTree({ treeData: [...newTreeData.treeData] }));
                    }}
                  />

                  <button
                    type="button"
                    className="btn btn-sm remove p-3"
                    onClick={() => {
                      if (node.removable) {
                        const newTreeData = removeNode({ treeData: nodes, path, getNodeKey });
                        dispatch(changeTree({ treeData: newTreeData.treeData }));
                      }
                    }}
                  />
                </>
              ),
            };
          }}
        />
      </div>
    </div>
  );
}

export default App;
