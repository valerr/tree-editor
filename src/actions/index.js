import { createAction } from '@reduxjs/toolkit';

export const changeTree = createAction('changeTree');

export const changeNode = createAction('changeNode');

export const addNode = createAction('addNode');

export const removeNode = createAction('removeNode');
