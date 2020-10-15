// Libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ManagePolls from './components/manage-polls/ManagePolls';
import Survey from './components/poll/Poll';

// Components

const Router = () => {
  return (
    <Switch>
      <Route exact path='/manage-polls' component={ManagePolls} />
      <Route path='/polls/:pollIndex' component={Survey} />
    </Switch>
  );
};

export default Router;
