import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { FiLogOut } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
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
const NavBar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  addIssue,
}) => {
  const [IsOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const handleClick = () => {
    logout();
    history.push('/login');
  };
  const [formData, setFormData] = useState({
    title: '',
    owner: '',
  });
  const { title, owner } = formData;
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const id = user._id;
    const body = JSON.stringify({ title, owner, id });
    try {
      await axios.post('/api/issues', body, config);
    } catch (err) {
      console.error(err);
    }
    setFormData({ title: '', owner: '' });
    setIsOpen(false);
  };
  return (
    <header>
      <div className='header'>
        <h1>
          <Link to='/home' className='heading-title'>
            Issue Tracker
          </Link>
        </h1>
        <div className='create-issue' onClick={() => setIsOpen(true)}>
          <FaPlus className='plus-icon' />
          <span>Create Issue</span>
        </div>
        <Modal
          isOpen={IsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <form className='form' onSubmit={handleSubmit} noValidate>
            <div className='form-inputs'>
              <input
                className='form-input'
                type='text'
                name='title'
                value={title}
                onChange={handleChange}
                required
              />
              <label className='form-label'>Title</label>
            </div>
            <div className='form-inputs'>
              <input
                className='form-input'
                type='text'
                name='owner'
                value={owner}
                onChange={handleChange}
                required
              />
              <label className='form-label'>Owner</label>
            </div>
            <button type='submit' className='form-input-btn'>
              ADD ISSUE
            </button>
          </form>
        </Modal>
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
