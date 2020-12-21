import React from 'react';
import IssueRow from './IssueRow';
const IssueTable = ({ issues }) => {
  return (
    <table className='issue-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Priority</th>
          <th>Completion Date</th>
          <th>Creation Date</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => {
          return <IssueRow key={issue._id} {...issue} />;
        })}
      </tbody>
    </table>
  );
};

export default IssueTable;
