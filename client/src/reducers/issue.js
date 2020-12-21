import { ADD_ISSUE, REMOVE_ISSUE } from '../actions/types';

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ISSUE:
      return [...state, action.payload];
    case REMOVE_ISSUE:
      return state.filter((issue) => issue !== action.payload);
    default:
      return state;
  }
}
