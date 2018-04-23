import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Authenticated from '../../views/Pages/Authenticated';

import Dashboard from '../../views/Dashboard/'
import Charts from '../../views/Charts/'
import Widgets from '../../views/Widgets/'
import Buttons from '../../views/Components/Buttons/'
import Cards from '../../views/Components/Cards/'
import Forms from '../../views/Components/Forms/'
import Modals from '../../views/Components/Modals/'
import SocialButtons from '../../views/Components/SocialButtons/'
import Switches from '../../views/Components/Switches/'
import Tables from '../../views/Components/Tables/'
import Tabs from '../../views/Components/Tabs/'
import FontAwesome from '../../views/Icons/FontAwesome/'
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/'


const Full = appProps => (
  <div className="app">
    <Header />
    <div className="app-body">
      <Sidebar {...appProps} />
      <main className="main">
        <Breadcrumb />
        <div className="container-fluid">
          <Switch>
            <Authenticated path="/dashboard" name="Dashboard" component={Dashboard} {...appProps}/>
            <Authenticated path="/components/buttons" name="Buttons" component={Buttons} {...appProps}/>
            <Authenticated path="/components/cards" name="Cards" component={Cards} {...appProps}/>
            <Authenticated path="/components/forms" name="Forms" component={Forms} {...appProps}/>
            <Authenticated path="/components/modals" name="Modals" component={Modals} {...appProps}/>
            <Authenticated path="/components/social-buttons" name="Social Buttons" component={SocialButtons} {...appProps}/>
            <Authenticated path="/components/switches" name="Swithces" component={Switches} {...appProps}/>
            <Authenticated path="/components/tables" name="Tables" component={Tables} {...appProps}/>
            <Authenticated path="/components/tabs" name="Tabs" component={Tabs} {...appProps}/>
            <Authenticated path="/icons/font-awesome" name="Font Awesome" component={FontAwesome} {...appProps}/>
            <Authenticated path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons} {...appProps}/>
            <Authenticated path="/widgets" name="Widgets" component={Widgets} {...appProps}/>
            <Authenticated path="/charts" name="Charts" component={Charts} {...appProps}/>
            <Redirect from="/" to="/login"/>
          </Switch>
        </div>
      </main>
      <Aside />
    </div>
    <Footer />
  </div>
);

Full.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
};

const composer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
};

export default composeWithTracker(composer)(Full);