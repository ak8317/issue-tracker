import React from 'react';

const IssueRow = (issue) => {
  return (
    <>
      <tr>
        <td data-label='ID'>{issue._id.substr(-4)}</td>
        <td data-label='Title'>{issue.title}</td>
        <td data-label='Status'>{issue.status}</td>
        <td data-label='Owner'>{issue.owner}</td>
        <td data-label='Priority'>{issue.priority}</td>
        <td data-label='CompletionDate'>
          {issue.completionDate ? issue.completionDate : ''}
        </td>
        <td data-label='CreationDate'>
          {new Date(issue.created).toDateString()}
        </td>
      </tr>
    </>
  );
};

export default IssueRow;
