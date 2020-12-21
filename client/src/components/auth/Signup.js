import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ setAlert, register, alerts, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'password2', 'danger');
    } else {
      register({ name, email, password });
    }
    setFormData({ name: '', email: '', password: '', password2: '' });
  };

  //Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='app'>
      <div className='form-content'>
        <form className='form' onSubmit={handleSubmit} noValidate>
          <h1>Issue Tracker</h1>
          <div className='form-inputs'>
            <input
              className='form-input'
              type='text'
              // placeholder='Enter your name'
              name='name'
              value={name}
              onChange={handleChange}
              required
            />
            <label className='form-label'>Name</label>
            {alerts &&
              alerts.map((alert) => {
                if (alert.param === 'name') {
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
            <input
              className='form-input'
              type='text'
              // placeholder='Enter your email'
              name='email'
              value={email}
              onChange={handleChange}
              required
            />
            <label className='form-label'>Email</label>
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
            <input
              className='form-input'
              type='password'
              // placeholder='Enter your password'
              name='password'
              value={password}
              onChange={handleChange}
              required
            />
            <label className='form-label'>Password</label>
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
          <div className='form-inputs'>
            <input
              className='form-input'
              type='password'
              // placeholder='Enter your password'
              name='password2'
              value={password2}
              onChange={handleChange}
              required
            />
            <label className='form-label'>Confirm Password</label>
            {alerts &&
              alerts.map((alert) => {
                if (alert.param === 'password2') {
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
            SignUp
          </button>
          <span className='form-input-links'>
            {' '}
            Already have an account? Login{' '}
            <Link className='link' to='/login'>
              here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Signup);
