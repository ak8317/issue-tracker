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

  const clearFilter = (e) => {
    setStatus('');

    setPriority('');
    setChanged(false);
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
      Status:
      <select value={status} onChange={onChangeStatus}>
        <option value=''>(Any)</option>
        <option value='New'>New</option>
        <option value='Open'>Open</option>
        <option value='Assigned'>Assigned</option>
        <option value='Fixed'>Fixed</option>
        <option value='Verified'>Verified</option>
        <option value='Closed'>Closed</option>
      </select>
      &nbsp;Priority:
      <select value={priority} onChange={onChangePriority}>
        <option value=''>(Any)</option>
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='high'>High</option>
      </select>
      <button onClick={applyFilter}>Apply</button>
      <button onClick={resetFilter} disabled={!changed}>
        Reset
      </button>
      <button onClick={clearFilter}>Clear</button>
    </div>
  );
};

export default IssueFilter;
