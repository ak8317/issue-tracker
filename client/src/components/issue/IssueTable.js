import React from 'react';
import IssueRow from './IssueRow';
const IssueTable = ({ issues }) => {
  return (
    // <div className='issue-table'>
    //   <div className='issue-col'>ID</div>
    //   <div className='issue-col'>Title</div>
    //   <div className='issue-col'>Status</div>
    //   <div className='issue-col'>Owner</div>
    //   <div className='issue-col'>Priority</div>
    //   <div className='issue-col'>Completion Date</div>
    //   <div className='issue-col'>Creation Date</div>
    //   {issues.map((issue) => {
    //     return <IssueRow key={issue.id} {...issue} />;
    //   })}
    // </div>
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
