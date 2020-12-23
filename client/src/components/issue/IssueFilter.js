import React, { useState } from 'react';

const IssueFilter = ({ getFilter }) => {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const [changed, setChanged] = useState(false);

  const onChangeStatus = (e) => {
    setChanged(true);
    setStatus(e.target.value);
  };

  const onChangePriority = (e) => {
    setChanged(true);
    setPriority(e.target.value);
  };

  const applyFilter = () => {
    const newFilter = {};
    if (status) newFilter.status = status;
    if (priority) newFilter.priority = priority;
    // setChanged(true)

    getFilter(newFilter);
    //clearFilter()
    // resetFilter()
  };
  const resetFilter = () => {
    setStatus('');
    setPriority('');
    setChanged(false);
    getFilter({});
  };

  return (
    <div className='filter-container'>
      <div className='filter'>
        <label>Status</label>
        <select value={status} onChange={onChangeStatus}>
          <option value=''>(Any)</option>
          <option value='New'>New</option>
          <option value='Open'>Open</option>
          <option value='Assigned'>Assigned</option>
          <option value='Fixed'>Fixed</option>
          <option value='Verified'>Verified</option>
          <option value='Closed'>Closed</option>
        </select>
      </div>

      <div className='filter'>
        <label>Priority</label>
        <select value={priority} onChange={onChangePriority}>
          <option value=''>(Any)</option>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>
      <div className='filter-btns'>
        <button className='filter-btn' onClick={applyFilter}>
          Apply
        </button>
        <button className='reset-btn' onClick={resetFilter} disabled={!changed}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default IssueFilter;
