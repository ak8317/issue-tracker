import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
const Login = ({ login, alerts, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setFormData({ email: '', password: '' });
  };

  //Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }
  return (
    <div className='app'>
      {/* <Alert /> */}
      <div className='form-content'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Issue Tracker</h1>

          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='text'
              placeholder='Enter your email'
              name='email'
              value={email}
              onChange={handleChange}
            />
            {alerts &&
              alerts.map((alert) => {
                if (alert.param === 'email') {
                  return (
                    <p
                      key={alert.id}
                      className={`alert alert-${alert.alertType}`}
                    >
                      {alert.msg}
                    </p>
                  );
                }
                return <></>;
              })}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'
              placeholder='Enter your password'
              name='password'
              value={password}
              onChange={handleChange}
            />
            {alerts &&
              alerts.map((alert) => {
                if (alert.param === 'password') {
                  return (
                    <p
                      key={alert.id}
                      className={`alert alert-${alert.alertType}`}
                    >
                      {alert.msg}
                    </p>
                  );
                }
                return <></>;
              })}
          </div>
          <button type='submit' className='form-input-btn'>
            LOGIN
          </button>
          <span className='form-input-links'>
            {' '}
            Don't have an account? SignUp{' '}
            <Link className='link' to='/signup'>
              here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
