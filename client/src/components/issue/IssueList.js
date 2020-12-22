import React, { useState, useEffect } from 'react';
import IssueTable from './IssueTable';
import IssueFilter from './IssueFilter';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
const queryString = require('query-string');

const IssueList = (props) => {
  const search = useLocation().search;
  const [issues, setIssues] = useState([]);
  //const [size, setSize] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    let mounted = true;
    const getIssues = async () => {
      try {
        const res = await axios.get(
          `api/issues/${search}${search ? '&' : '?'}pageNo=${pageNo}&size=5`
        );
        if (mounted) {
          // console.log(res.data);
          setIssues(res.data.message);
          setTotalPages(res.data.pages);
        }

        //console.log(res);
      } catch (err) {
        console.error(err.message);
      }
    };
    getIssues();
    return function cleanup() {
      mounted = false;
    };
  }, [issues, pageNo, search]);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPageNo(selectedPage + 1);
  };
  let history = useHistory();
  const getFilter = (q) => {
    const query = queryString.stringify(q);
    // console.log(query);
    history.push({ pathname: props.history.location.pathname, search: query });
  };
  return (
    <div className='issue-container'>
      <IssueFilter getFilter={getFilter} />
      <IssueTable issues={issues} />
      <div className='pagination-container'>
        <div>
          <ReactPaginate
            previousLabel={'<<'}
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            nextLabel={'>>'}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  );
};

export default IssueList;
