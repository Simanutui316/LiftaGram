import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import ProfilePage from '../ProfilePage/ProfilePage';
import Feed from '../Feed/Feed';

function App() {
  console.log(userService)
  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin() {
    // this will be called after the user logins or signups
    // so we can set the new user in our state or whatever value is in 
    // the token stored localstorage
    setUser(userService.getUser())
  }

  function handleLogout() {
    userService.logout();
    setUser({ user: null })
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />
        </Route>
        <Route exact path="/signup">
          <SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />
        </Route>
        {userService.getUser() ?

          <Switch>
            <Route exact path="/">
              <Feed user={user} handleLogout={handleLogout} />
            </Route>
            <Route path="/:username">
              <ProfilePage user={user} handleLogout={handleLogout} />
            </Route>
          </Switch>

          :
          <Redirect to='/login' />
        }

      </Switch>
    </div>
  );
}

export default App;