import React, { useState, useEffect } from 'react';
import IssueTable from './IssueTable';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeIssue } from '../../actions/issue';
const IssueList = ({ issue, removeIssue }) => {
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
  }, [issues]);

  return (
    <div className='issue-container'>
      <IssueTable issues={issues} />
    </div>
  );
};
IssueList.propTypes = {
  issue: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  issue: state.issue[0],
});
export default connect(mapStateToProps, removeIssue)(IssueList);
