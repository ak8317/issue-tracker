import { ADD_ISSUE, REMOVE_ISSUE } from './types';
import axios from 'axios';
export const addIssue = (title, owner, id) => async (dispatch) => {
  //console.log('Issue');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ title, owner, id });
  try {
    const res = await axios.post('/api/issues', body, config);
    dispatch({
      type: ADD_ISSUE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
export const removeIssue = (issue) => (dispatch) => {
  dispatch({
    type: REMOVE_ISSUE,
    payload: issue,
  });
};
