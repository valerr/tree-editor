/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { useSelector, useDispatch } from 'react-redux';

import types from './types';
import {
  changeTree, changeNode, addNode, removeNode,
} from './actions';
import catIcon from './assets/CAT.svg';
import dogIcon from './assets/DOG.svg';
import birdIcon from './assets/BIRD.svg';
import './App.css';

function App() {
  const nodes = useSelector((state) => state.nodes);
  const dispatch = useDispatch();
  const [editingNode, setEditing] = useState({ treeIndex: null, name: null, type: null });

  const typeIcon = {
    CAT: catIcon,
    DOG: dogIcon,
    BIRD: birdIcon,
    default: catIcon,
  };

  const renderEditableNode = ({ node, path }) => ({
    title: (
      <>
        <div className="d-inline">
          <img alt={editingNode.type} className="node-type-icon" src={typeIcon[editingNode.type]} />
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
          defaultValue={node.type}
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
          className="ml-2 btn btn-sm p-1"
          onClick={() => {
            setEditing({ treeIndex: null });
            dispatch(changeNode({
              node, path, newName: editingNode.name, newType: editingNode.type,
            }));
          }}
        >
          <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
          </svg>
        </button>

        <button
          type="button"
          className="btn btn-sm p-1"
          onClick={() => {
            setEditing({ treeIndex: null });
          }}
        >
          <svg width="2.2em" height="2.2em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </>
    ),
  });

  const renderNode = (treeIndex, node, path) => {
    if (editingNode.treeIndex === treeIndex) {
      return renderEditableNode({ node, path, treeIndex });
    }
    return {
      title: (
        <>
          <div className="d-inline mr-1">
            <img alt={node.type} className="node-type-icon" src={typeIcon[node.type]} />
            {node.title}
          </div>

          <button type="button" className="mx-3 btn btn-sm" onClick={() => setEditing({ treeIndex, name: node.title, type: node.type })}>
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </button>

          <button
            type="button"
            className="btn btn-sm p-1"
            onClick={() => {
              dispatch(addNode({ parentKey: treeIndex }));
            }}
          >
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </button>

          <button
            type="button"
            className="btn btn-sm p-1"
            onClick={() => {
              dispatch(removeNode({ node, path }));
            }}
          >
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-dash-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
            </svg>
          </button>
        </>
      ),
    };
  };

  const downloadTree = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(nodes, null, 4)], { type: 'application/json;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'tree.json';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <div className="App">
        <div className="d-flex flex-row mb-3">
          <div className="input-group m-2 w-25">
            <div className="custom-file">
              <button type="button" className="custom-file-input btn" id="inputGroupFile" onClick={() => downloadTree()} />
              <label className="custom-file-label" htmlFor="inputGroupFile">Save file</label>
            </div>
          </div>

          <div className="input-group m-2 w-25">
            <div className="custom-file cursor-pointer">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                onChange={(event) => {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.readAsText(file);
                  reader.onload = () => {
                    dispatch(changeTree({ treeData: [...JSON.parse(reader.result)] }));
                  };
                }}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">Open file</label>
            </div>
          </div>
        </div>

        <SortableTree
          treeData={nodes}
          onChange={(treeData) => {
            dispatch(changeTree({ treeData }));
          }}
          generateNodeProps={({ node, path, treeIndex }) => renderNode(treeIndex, node, path)}
        />
      </div>
    </div>
  );
}

export default App;
