import './App.css';
import React, { useEffect ,Suspense,lazy} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
// const AvatarComponent = lazy(() => import('./AvatarComponent'));
const Signup =lazy(( )=>import('./components/auth/Signup'));
const Login=lazy(()=>import('./components/auth/Login'))

const IssueEdit=lazy(()=>import('./components/issue/IssueEdit'))
// import IssueEdit from './components/issue/IssueEdit';

const IssueList =lazy(()=>import('./components/issue/IssueList'))
// import IssueList from './components/issue/IssueList';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ auth: { isAuthenticated } }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const renderLoader = () => <div className="loader"></div>;
  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Switch>
      <Suspense fallback={renderLoader()}>
           
          
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={withRouter(IssueList)} />
        <Route exact path='/issues/:id' component={IssueEdit} />
        </Suspense> 
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
