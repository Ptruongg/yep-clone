import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='modal'>
      <form className="loginContainer" onSubmit={onLogin}>
        <div className='errors_login' style={{color: "red"}}>
          {errors.map((error, ind) => (
            <div key={ind}>{error.split(':')[1]}</div>
          ))}
        </div>
        <div>
          <label className='mail' htmlFor='email'>Email</label>
          <input
            className='loginInput'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            style={{width: "100%"}}
          />
        </div>
        <div>
          <label className='pass'  htmlFor='password'>Password</label>
          <input
            className='passInput'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            style={{width: "100%"}}
          />

          <button className='loginButton' type='submit'>
            Login
          </button>

          <button
            type="submit"
            className="demo-login-form-button"
            onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
            }}
          >
            Demo Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
