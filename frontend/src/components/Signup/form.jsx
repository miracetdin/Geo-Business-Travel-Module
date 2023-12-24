import React from 'react';
import style from './styles.module.css';

function form() {
  return (
    <>
      <form>
        <div className="name">
          <label htmlFor="name">Name:</label>
          <input class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="text" id="name" name="name" />
        </div>
        <div className="surname mt-2">
          <label htmlFor="surname">Surname:</label>
          <input class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="text" id="surname" name="surname" />
        </div>
        <div className="email mt-2">
          <label htmlFor="email">E-mail:</label>
          <input class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="email" id="email" name="email" />
        </div>
        <div className="username mt-2">
          <label htmlFor="username">Username:</label>
          <input class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="text" id="username" name="username" />
        </div>
        <div className="password mt-2">
          <label htmlFor="password">Password:</label>
          <input class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="password" id="password" name="password" />
        </div>
        <div className="password2 mt-2">
          <label htmlFor="password2">Re-enter Password:</label>
          <input class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="password2" id="password2" name="password2" />
        </div>
        <div className="login mt-2">
            <button type="submit" className={style.button}>Sign Up</button>
        </div>
      </form>
    </>
  )
};

export default form;
