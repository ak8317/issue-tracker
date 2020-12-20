import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { FiLogOut } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = {};
  const history = useHistory();
  const handleClick = () => {
    logout();
    history.push('/login');
  };
  return (
    <header>
      <div className='header'>
        <h1>Issue Tracker</h1>
        <div className='create-issue'>
          <FaPlus className='plus-icon' />
          <span>Create Issue</span>
        </div>
      </div>

      {!loading && (
        <button className='logout-btn' onClick={handleClick}>
          {isAuthenticated ? (
            <span>
              <FiLogOut />
              Logout
            </span>
          ) : (
            'Login'
          )}
        </button>
      )}
      {/* <nav>
        <ul className='nav-links'>
          <li className='list-items'>
            <FaPlus />
            <span>Create Issue</span>
          </li>
          {!loading && (
            <li className='list-items'>
              {isAuthenticated ? (
                <span>
                  <FiLogOut />
                  Logout
                </span>
              ) : (
                'Login'
              )}
            </li>
          )}
        </ul>
      </nav> */}
    </header>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(NavBar);
