import './App.css';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { connect } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import IssueEdit from './components/issue/IssueEdit';
import Navbar from './components/layout/NavBar';
import PropTypes from 'prop-types';
import IssueList from './components/issue/IssueList';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ auth: { isAuthenticated } }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={withRouter(IssueList)} />
        <Route exact path='/issues/:id' component={IssueEdit} />
      </Switch>
      <Redirect from='/' to='/signup' />
    </Router>
  );
}
App.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);
