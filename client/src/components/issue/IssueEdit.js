import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './edit.css';
const IssueEdit = () => {
  let { id } = useParams();
  let history = useHistory();
  const [issue, setIssue] = useState({
    title: '',
    owner: '',
    priority: '',
    completionDate: '',
    status: '',
  });
  const [created, setCreated] = useState('');
  const { title, owner, priority, completionDate, status } = issue;
  const fDate = (d) => {
    let date = new Date(d);
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let formatted_date = `${date.getFullYear()}-${
      month < 10 ? `0${month}` : month
    }-${dt < 10 ? `0${dt}` : dt}`;
    return formatted_date;
  };
  useEffect(() => {
    let mounted = true;
    const getIssue = async () => {
      try {
        const response = await fetch(`/api/issues/${id}`);
        const newIssue = await response.json();
        if (newIssue.completionDate) {
          newIssue.completionDate = fDate(newIssue.completionDate);
        }
        if (mounted) {
          setCreated(newIssue.created);
          setIssue({
            title: newIssue.title,
            owner: newIssue.owner,
            priority: newIssue.priority,
            status: newIssue.status,
            completionDate: newIssue.completionDate,
          });
        }

        //console.log(newIssue)
      } catch (err) {
        console.error(err);
      }
    };
    getIssue();
    return function cleanup() {
      mounted = false;
    };
  }, [id]);
  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/issues/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issue),
      });
      history.push('/home');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='edit-container'>
      <h2>Edit Issue</h2>
      <div className='form-edit-container'>
        <div className='static-fields'>
          <label className='static-fields-label label' id='label-id'>
            ID
          </label>
          <label>{id}</label>
          <label className='static-fields-label label'>Created</label>
          <label>{created && new Date(created).toDateString()}</label>
        </div>
        <form className='form-edit' onSubmit={handleSubmit}>
          <div className='form-edit-inputs'>
            <label className='label'>Title</label>
            <input
              name='title'
              type='text'
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className='form-edit-inputs select-div'>
            <label className='label label-status'>Status</label>
            <select
              className='select'
              name='status'
              value={status}
              onChange={handleChange}
            >
              <option value='New'>New</option>
              <option value='Open'>Open</option>
              <option value='Assigned'>Assigned</option>
              <option value='Fixed'>Fixed</option>
              <option value='Verified'>Verified</option>
              <option value='Closed'>Closed</option>
            </select>
          </div>
          <div className='form-edit-inputs'>
            <label className='label'>Owner</label>
            <input name='owner' value={owner} onChange={handleChange} />
          </div>
          <div className='form-edit-inputs'>
            <label className='label'>Priority</label>
            <input
              name='priority'
              type='text'
              value={priority}
              onChange={handleChange}
            />
          </div>
          <div className='form-edit-inputs'>
            <label className='label'>Completion Date</label>
            <input
              name='completionDate'
              type='Date'
              value={completionDate ? completionDate : ''}
              onChange={handleChange}
              className='date'
            />
          </div>
          <div className='edit-buttons'>
            <button className='btn btn-submit' type='submit'>
              Submit
            </button>
            <button
              className='btn btn-back'
              onClick={() => {
                history.push('/home');
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueEdit;
