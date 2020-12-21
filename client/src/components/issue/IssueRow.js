import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';

const customStyles = {
  overlay: {},
  content: {
    width: '400px',
    margin: '0 auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#fae982',
  },
};

Modal.setAppElement('#root');
const IssueRow = (issue) => {
  const [IsOpen, setIsOpen] = useState(false);

  const removeIssue = async () => {
    try {
      await fetch(`/api/issues/${issue._id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error(err);
    }
    setIsOpen(false);
  };
  return (
    <>
      <tr>
        <td data-label='ID'>
          <Link to={`issues/${issue._id}`}>{issue._id.substr(-4)}</Link>
        </td>
        <td data-label='Title'>{issue.title}</td>
        <td data-label='Status'>{issue.status}</td>
        <td data-label='Owner'>{issue.owner}</td>
        <td data-label='Priority'>{issue.priority}</td>
        <td data-label='CompletionDate'>
          {issue.completionDate
            ? new Date(issue.completionDate).toDateString()
            : ''}
        </td>
        <td data-label='CreationDate'>
          <div className='last-col'>
            {' '}
            {new Date(issue.created).toDateString()}
            <FaRegTrashAlt
              className='delete-icon'
              onClick={() => setIsOpen(true)}
            />
          </div>
          <Modal
            isOpen={IsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
          >
            <div>Are your sure! You want to delete the issue</div>
            <button className='btn-yes' onClick={removeIssue}>
              Yes
            </button>
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default IssueRow;
