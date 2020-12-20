import React, { useState, useEffect } from 'react';
import IssueTable from './IssueTable';
import { useLocation, useHistory } from 'react-router-dom';
import mockData from './mockData';
import axios from 'axios';
const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getIssues = async () => {
      try {
        const res = await axios.get('api/issues');
        if (mounted) {
          setIssues(res.data);
        }

        console.log(res);
      } catch (err) {
        console.error(err.message);
      }
    };
    getIssues();
    return function cleanup() {
      mounted = false;
    };
  }, []);
  return (
    <div className='issue-container'>
      <IssueTable issues={issues} />
    </div>
  );
};

export default IssueList;
