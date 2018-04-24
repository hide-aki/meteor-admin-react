import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createBrowserHistory } from 'history';
import { HashRouter, Route, Switch } from 'react-router-dom'

// Container
import Full from '../../ui/containers/Full/'

// Views
import Login from '../../ui/views/Login/'
import ResetPassword from '../../ui/views/ResetPassword';
import VerifyEmail from '../../ui/views/VerifyEmail';
import RecoverPassword from '../../ui/views/RecoverPassword';
import Register from '../../ui/views/Register/'
import Page404 from '../../ui/views/Page404/'
import Page500 from '../../ui/views/Page500/'

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