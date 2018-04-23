import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
// Containers
import Full from './containers/Full/'
// Views
import Login from './views/Pages/Login/'
import ResetPassword from './views/Pages/ResetPassword';
import VerifyEmail from './views/Pages/VerifyEmail';
import RecoverPassword from './views/Pages/RecoverPassword';
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

const history = createBrowserHistory();

Meteor.startup(() => {
  render(
    <HashRouter history={history}>
      <Switch>
        <Route exact path="/login" name="Login Page" component={Login}/>
        <Route exact path="/signup" name="Register Page" component={Register}/>
        <Route path="/recover-password" name="Recover Password Page" component={RecoverPassword} />
        <Route path="/reset-password/:token" name="Reset Password Page" component={ResetPassword} />
        <Route path="/verify-email/:token" name="Verify Email Page" component={VerifyEmail} />
        <Route exact path="/404" name="Page 404" component={Page404}/>
        <Route exact path="/500" name="Page 500" component={Page500}/>
        <Route path="/" name="Home" component={Full}/>
      </Switch>
    </HashRouter>,
    document.getElementById('root'));
});
