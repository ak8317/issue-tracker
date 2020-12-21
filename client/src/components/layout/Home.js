import React from 'react';
import NavBar from './NavBar';
import IssueList from '../issue/IssueList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IssueEdit from '../issue/IssueEdit';
const Home = () => {
  return (
    <>
      <IssueList />
    </>
  );
};

export default Home;
